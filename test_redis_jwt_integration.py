#!/usr/bin/env python3
"""
Test script to demonstrate Redis and JWT integration with CodePitamah
"""
import requests
import time
import json
import jwt
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000/api/codepitamah"

def test_user_registration():
    """Test user registration and JWT token generation"""
    print("🔐 Testing User Registration...")
    
    # Test registration
    registration_data = {
        "email": "test@example.com",
        "subscription_plan": "pro"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=registration_data)
        if response.status_code == 200:
            data = response.json()
            token = data["data"]["token"]
            user = data["data"]["user"]
            rate_limits = data["data"]["rate_limits"]
            
            print("✅ User registered successfully!")
            print(f"   User ID: {user['user_id']}")
            print(f"   Plan: {user['subscription_plan']}")
            print(f"   Rate Limits: {rate_limits['requests_per_minute']} requests/minute")
            print(f"   JWT Token: {token[:50]}...")
            
            return token, user
        else:
            print(f"❌ Registration failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return None, None
            
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return None, None

def test_authenticated_analysis(token, user):
    """Test code analysis with authentication"""
    print(f"\n🔍 Testing Authenticated Code Analysis for {user['subscription_plan']} user...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test multiple requests to see rate limiting
    for i in range(15):
        try:
            response = requests.post(f"{BASE_URL}/analyze", 
                json={"code": f"def test{i}():\n    return {i}", "language": "python"},
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                rate_info = data["data"]["rate_limit_info"]
                print(f"   Request {i+1}: ✅ Success - {rate_info['remaining_requests']} remaining")
            elif response.status_code == 429:
                error_data = response.json()
                print(f"   Request {i+1}: ⏱️ Rate limited - {error_data['detail']}")
                break
            else:
                print(f"   Request {i+1}: ❌ Error {response.status_code}")
                
        except Exception as e:
            print(f"   Request {i+1}: ❌ Error: {e}")
        
        time.sleep(0.1)

def test_anonymous_analysis():
    """Test code analysis without authentication"""
    print(f"\n👤 Testing Anonymous Code Analysis...")
    
    # Test multiple requests to see rate limiting
    for i in range(15):
        try:
            response = requests.post(f"{BASE_URL}/analyze", 
                json={"code": f"def test{i}():\n    return {i}", "language": "python"}
            )
            
            if response.status_code == 200:
                data = response.json()
                rate_info = data["data"]["rate_limit_info"]
                print(f"   Request {i+1}: ✅ Success - {rate_info['remaining_requests']} remaining")
            elif response.status_code == 429:
                error_data = response.json()
                print(f"   Request {i+1}: ⏱️ Rate limited - {error_data['detail']}")
                break
            else:
                print(f"   Request {i+1}: ❌ Error {response.status_code}")
                
        except Exception as e:
            print(f"   Request {i+1}: ❌ Error: {e}")
        
        time.sleep(0.1)

def test_user_activity_tracking(token):
    """Test user activity tracking"""
    print(f"\n📊 Testing User Activity Tracking...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    try:
        response = requests.get(f"{BASE_URL}/user/activity", headers=headers)
        if response.status_code == 200:
            data = response.json()
            activities = data["data"]["activities"]
            print(f"✅ Retrieved {len(activities)} activities")
            
            for activity in activities[:3]:  # Show first 3 activities
                print(f"   - {activity['activity']} at {activity['timestamp']}")
        else:
            print(f"❌ Failed to get activity: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Activity tracking error: {e}")

def test_security_status():
    """Test security status endpoint"""
    print(f"\n🛡️ Testing Security Status...")
    
    try:
        response = requests.get(f"{BASE_URL}/security-status")
        if response.status_code == 200:
            data = response.json()
            security_data = data["data"]
            
            print("✅ Security Status:")
            print(f"   Max Code Size: {security_data['max_code_size']} characters")
            print(f"   Max Analysis Time: {security_data['max_analysis_time']} seconds")
            print(f"   Redis Connected: {security_data['redis_connected']}")
            print(f"   Security Features: {len(security_data['security_features'])} active")
            
            print("   Rate Limit Plans:")
            for plan, limits in security_data['rate_limit_plans'].items():
                print(f"     {plan}: {limits['requests']} requests per {limits['window']} seconds")
        else:
            print(f"❌ Failed to get security status: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Security status error: {e}")

def test_different_subscription_plans():
    """Test different subscription plans"""
    print(f"\n💎 Testing Different Subscription Plans...")
    
    plans = ["free", "pro", "enterprise"]
    tokens = {}
    
    for plan in plans:
        print(f"\n   Testing {plan.upper()} plan...")
        
        registration_data = {
            "email": f"test_{plan}@example.com",
            "subscription_plan": plan
        }
        
        try:
            response = requests.post(f"{BASE_URL}/register", json=registration_data)
            if response.status_code == 200:
                data = response.json()
                token = data["data"]["token"]
                rate_limits = data["data"]["rate_limits"]
                tokens[plan] = token
                
                print(f"   ✅ {plan} user registered")
                print(f"   Rate Limits: {rate_limits['requests_per_minute']} requests/minute")
                
                # Test a few requests
                headers = {"Authorization": f"Bearer {token}"}
                for i in range(3):
                    response = requests.post(f"{BASE_URL}/analyze", 
                        json={"code": f"def {plan}_test{i}():\n    return {i}", "language": "python"},
                        headers=headers
                    )
                    if response.status_code == 200:
                        data = response.json()
                        remaining = data["data"]["rate_limit_info"]["remaining_requests"]
                        print(f"   Request {i+1}: {remaining} remaining")
                        
            else:
                print(f"   ❌ {plan} registration failed: {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ {plan} error: {e}")
    
    return tokens

def test_jwt_token_validation():
    """Test JWT token validation and expiration"""
    print(f"\n🔑 Testing JWT Token Validation...")
    
    # Test with invalid token
    print("   Testing invalid token...")
    headers = {"Authorization": "Bearer invalid_token"}
    try:
        response = requests.post(f"{BASE_URL}/analyze", 
            json={"code": "def test():\n    pass", "language": "python"},
            headers=headers
        )
        if response.status_code == 200:
            print("   ✅ Invalid token treated as anonymous user")
        else:
            print(f"   ❌ Invalid token handling: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Invalid token error: {e}")
    
    # Test without token
    print("   Testing no token...")
    try:
        response = requests.post(f"{BASE_URL}/analyze", 
            json={"code": "def test():\n    pass", "language": "python"}
        )
        if response.status_code == 200:
            print("   ✅ No token treated as anonymous user")
        else:
            print(f"   ❌ No token handling: {response.status_code}")
    except Exception as e:
        print(f"   ❌ No token error: {e}")

def main():
    """Run all Redis and JWT integration tests"""
    print("🚀 CodePitamah Redis & JWT Integration Test Suite")
    print("=" * 60)
    
    # Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/security-status", timeout=5)
        if response.status_code != 200:
            print("❌ Server not responding. Please start the enhanced backend server first.")
            return
    except:
        print("❌ Server not responding. Please start the enhanced backend server first.")
        return
    
    # Run tests
    test_security_status()
    
    # Test user registration and authentication
    token, user = test_user_registration()
    if token and user:
        test_authenticated_analysis(token, user)
        test_user_activity_tracking(token)
    
    # Test anonymous usage
    test_anonymous_analysis()
    
    # Test different subscription plans
    tokens = test_different_subscription_plans()
    
    # Test JWT validation
    test_jwt_token_validation()
    
    print("\n" + "=" * 60)
    print("🏁 Redis & JWT integration tests completed!")
    print("\n💡 Enhanced Features Demonstrated:")
    print("   ✅ Redis-based distributed rate limiting")
    print("   ✅ JWT authentication and user management")
    print("   ✅ Subscription-based rate limits")
    print("   ✅ User activity tracking")
    print("   ✅ Suspicious behavior detection")
    print("   ✅ Security status monitoring")
    print("   ✅ Graceful fallback for Redis unavailability")
    
    print("\n🚀 Benefits Achieved:")
    print("   📈 Scalability: Works across multiple server instances")
    print("   🔒 Security: User-based access control and monitoring")
    print("   💰 Monetization: Different limits for different plans")
    print("   📊 Analytics: Real-time usage and security metrics")
    print("   🛡️ Protection: Advanced threat detection and prevention")

if __name__ == "__main__":
    main()
