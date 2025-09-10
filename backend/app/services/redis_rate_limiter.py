"""
Redis-based rate limiter for distributed CodePitamah instances
"""
import redis
import json
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class RedisRateLimiter:
    """Advanced rate limiter using Redis for distributed systems"""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.redis_client = redis.from_url(redis_url, decode_responses=True)
        self.default_limits = {
            "anonymous": {"requests": 10, "window": 60},
            "free": {"requests": 50, "window": 60},
            "pro": {"requests": 200, "window": 60},
            "enterprise": {"requests": 1000, "window": 60}
        }
    
    def check_rate_limit(
        self, 
        identifier: str, 
        limit_type: str = "ip",
        user_plan: str = "anonymous"
    ) -> Dict[str, Any]:
        """
        Check rate limit using Redis sliding window algorithm
        
        Args:
            identifier: IP address or user ID
            limit_type: "ip" or "user"
            user_plan: Subscription plan (anonymous, free, pro, enterprise)
        
        Returns:
            Dict with rate limit status and details
        """
        limits = self.default_limits.get(user_plan, self.default_limits["anonymous"])
        key = f"rate_limit:{limit_type}:{identifier}"
        current_time = datetime.utcnow()
        window_start = current_time - timedelta(seconds=limits["window"])
        
        try:
            # Use Redis pipeline for atomic operations
            pipe = self.redis_client.pipeline()
            
            # Remove expired entries (older than window)
            pipe.zremrangebyscore(key, 0, window_start.timestamp())
            
            # Count current requests in window
            pipe.zcard(key)
            
            # Add current request
            pipe.zadd(key, {str(current_time.timestamp()): current_time.timestamp()})
            
            # Set expiration for cleanup
            pipe.expire(key, limits["window"] + 60)  # Extra 60 seconds for cleanup
            
            # Execute pipeline
            results = pipe.execute()
            current_count = results[1]
            
            # Check if limit exceeded
            limit_exceeded = current_count >= limits["requests"]
            
            # Calculate remaining requests and reset time
            remaining_requests = max(0, limits["requests"] - current_count)
            
            # Get oldest request to calculate reset time
            oldest_requests = self.redis_client.zrange(key, 0, 0, withscores=True)
            reset_time = None
            if oldest_requests:
                oldest_timestamp = oldest_requests[0][1]
                reset_time = datetime.fromtimestamp(oldest_timestamp) + timedelta(seconds=limits["window"])
            
            return {
                "allowed": not limit_exceeded,
                "current_count": current_count,
                "limit": limits["requests"],
                "remaining": remaining_requests,
                "reset_time": reset_time.isoformat() if reset_time else None,
                "window_seconds": limits["window"],
                "plan": user_plan
            }
            
        except redis.RedisError as e:
            logger.error(f"Redis error in rate limiting: {e}")
            # Fallback: allow request if Redis is down
            return {
                "allowed": True,
                "current_count": 0,
                "limit": limits["requests"],
                "remaining": limits["requests"],
                "reset_time": None,
                "window_seconds": limits["window"],
                "plan": user_plan,
                "error": "Redis unavailable, allowing request"
            }
    
    def get_rate_limit_status(self, identifier: str, limit_type: str = "ip") -> Dict[str, Any]:
        """Get current rate limit status without incrementing counter"""
        key = f"rate_limit:{limit_type}:{identifier}"
        
        try:
            current_count = self.redis_client.zcard(key)
            
            # Get window info
            oldest_requests = self.redis_client.zrange(key, 0, 0, withscores=True)
            newest_requests = self.redis_client.zrange(key, -1, -1, withscores=True)
            
            window_info = {}
            if oldest_requests and newest_requests:
                oldest_time = datetime.fromtimestamp(oldest_requests[0][1])
                newest_time = datetime.fromtimestamp(newest_requests[0][1])
                window_info = {
                    "oldest_request": oldest_time.isoformat(),
                    "newest_request": newest_time.isoformat(),
                    "window_span_seconds": (newest_time - oldest_time).total_seconds()
                }
            
            return {
                "current_count": current_count,
                "window_info": window_info,
                "ttl": self.redis_client.ttl(key)
            }
            
        except redis.RedisError as e:
            logger.error(f"Redis error getting rate limit status: {e}")
            return {"error": "Redis unavailable"}
    
    def reset_rate_limit(self, identifier: str, limit_type: str = "ip") -> bool:
        """Reset rate limit for specific identifier (admin function)"""
        key = f"rate_limit:{limit_type}:{identifier}"
        
        try:
            result = self.redis_client.delete(key)
            logger.info(f"Reset rate limit for {limit_type}:{identifier}")
            return result > 0
        except redis.RedisError as e:
            logger.error(f"Redis error resetting rate limit: {e}")
            return False
    
    def get_analytics(self) -> Dict[str, Any]:
        """Get rate limiting analytics"""
        try:
            # Get all rate limit keys
            ip_keys = self.redis_client.keys("rate_limit:ip:*")
            user_keys = self.redis_client.keys("rate_limit:user:*")
            
            analytics = {
                "total_ip_limits": len(ip_keys),
                "total_user_limits": len(user_keys),
                "high_usage_ips": [],
                "high_usage_users": [],
                "redis_memory_usage": self.redis_client.memory_usage("rate_limit:*") if hasattr(self.redis_client, 'memory_usage') else None
            }
            
            # Find high-usage IPs
            for key in ip_keys[:100]:  # Limit to first 100 for performance
                count = self.redis_client.zcard(key)
                if count > 5:  # Flag IPs with more than 5 requests
                    ip = key.split(":")[-1]
                    analytics["high_usage_ips"].append({
                        "ip": ip,
                        "request_count": count,
                        "ttl": self.redis_client.ttl(key)
                    })
            
            # Find high-usage users
            for key in user_keys[:100]:  # Limit to first 100 for performance
                count = self.redis_client.zcard(key)
                if count > 20:  # Flag users with more than 20 requests
                    user_id = key.split(":")[-1]
                    analytics["high_usage_users"].append({
                        "user_id": user_id,
                        "request_count": count,
                        "ttl": self.redis_client.ttl(key)
                    })
            
            return analytics
            
        except redis.RedisError as e:
            logger.error(f"Redis error getting analytics: {e}")
            return {"error": "Redis unavailable"}

class JWTUserManager:
    """JWT-based user authentication and management"""
    
    def __init__(self, secret_key: str, redis_client: redis.Redis):
        self.secret_key = secret_key
        self.redis = redis_client
        self.algorithm = "HS256"
    
    def create_user_token(self, user_data: Dict[str, Any]) -> str:
        """Create JWT token for user"""
        import jwt
        from datetime import datetime, timedelta
        
        payload = {
            **user_data,
            "exp": datetime.utcnow() + timedelta(hours=24),
            "iat": datetime.utcnow(),
            "iss": "codepitamah"
        }
        
        return jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
    
    def verify_user_token(self, token: str) -> Dict[str, Any]:
        """Verify and decode JWT token"""
        import jwt
        
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise ValueError("Token expired")
        except jwt.InvalidTokenError:
            raise ValueError("Invalid token")
    
    def track_user_activity(self, user_id: str, activity: str, metadata: Dict[str, Any]):
        """Track user activity for security monitoring"""
        activity_data = {
            "user_id": user_id,
            "activity": activity,
            "metadata": metadata,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        # Store in Redis with TTL
        key = f"user_activity:{user_id}:{datetime.utcnow().strftime('%Y%m%d')}"
        self.redis.lpush(key, json.dumps(activity_data))
        self.redis.expire(key, 86400 * 7)  # Keep for 7 days
    
    def get_user_activity(self, user_id: str, days: int = 1) -> list:
        """Get user activity for the last N days"""
        activities = []
        
        for i in range(days):
            date = (datetime.utcnow() - timedelta(days=i)).strftime('%Y%m%d')
            key = f"user_activity:{user_id}:{date}"
            
            try:
                day_activities = self.redis.lrange(key, 0, -1)
                for activity in day_activities:
                    activities.append(json.loads(activity))
            except redis.RedisError:
                continue
        
        return activities
    
    def detect_suspicious_activity(self, user_id: str) -> Dict[str, Any]:
        """Detect suspicious patterns in user activity"""
        activities = self.get_user_activity(user_id, days=1)
        
        suspicious_indicators = {
            "high_request_volume": len(activities) > 100,
            "dangerous_code_attempts": 0,
            "rate_limit_violations": 0,
            "unusual_times": 0,
            "multiple_ips": set()
        }
        
        for activity in activities:
            metadata = activity.get("metadata", {})
            
            # Count dangerous code attempts
            if activity.get("activity") == "dangerous_code_detected":
                suspicious_indicators["dangerous_code_attempts"] += 1
            
            # Count rate limit violations
            if activity.get("activity") == "rate_limit_exceeded":
                suspicious_indicators["rate_limit_violations"] += 1
            
            # Track IP addresses
            if "ip_address" in metadata:
                suspicious_indicators["multiple_ips"].add(metadata["ip_address"])
            
            # Check for unusual times (requests between 2-6 AM)
            activity_time = datetime.fromisoformat(activity["timestamp"])
            if 2 <= activity_time.hour <= 6:
                suspicious_indicators["unusual_times"] += 1
        
        suspicious_indicators["multiple_ips"] = len(suspicious_indicators["multiple_ips"])
        
        # Calculate suspicious score
        score = 0
        if suspicious_indicators["high_request_volume"]: score += 0.3
        if suspicious_indicators["dangerous_code_attempts"] > 3: score += 0.4
        if suspicious_indicators["rate_limit_violations"] > 5: score += 0.2
        if suspicious_indicators["unusual_times"] > 10: score += 0.1
        
        return {
            "suspicious_score": score,
            "indicators": suspicious_indicators,
            "recommendation": "block_user" if score > 0.7 else "monitor" if score > 0.3 else "normal"
        }

# Example usage and testing
if __name__ == "__main__":
    # Initialize Redis rate limiter
    rate_limiter = RedisRateLimiter()
    
    # Test rate limiting
    test_ip = "192.168.1.100"
    
    print("Testing Redis Rate Limiter...")
    for i in range(15):
        result = rate_limiter.check_rate_limit(test_ip, "ip", "free")
        print(f"Request {i+1}: Allowed={result['allowed']}, Remaining={result['remaining']}")
        
        if not result['allowed']:
            print(f"Rate limit exceeded! Reset time: {result['reset_time']}")
            break
    
    # Test analytics
    analytics = rate_limiter.get_analytics()
    print(f"\nAnalytics: {analytics}")
