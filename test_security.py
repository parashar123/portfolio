#!/usr/bin/env python3
"""
Test script to demonstrate CodePitamah security features
"""
import requests
import time
import json

BASE_URL = "http://localhost:8000/api/codepitamah"

def test_security_status():
    """Test security status endpoint"""
    print("🔒 Testing Security Status Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/security-status")
        if response.status_code == 200:
            data = response.json()
            print("✅ Security Status:")
            print(f"   Max Code Size: {data['data']['max_code_size']} characters")
            print(f"   Max Analysis Time: {data['data']['max_analysis_time']} seconds")
            print(f"   Rate Limit: {data['data']['rate_limit_requests']} requests per {data['data']['rate_limit_window']} seconds")
            print(f"   Dangerous Patterns: {data['data']['dangerous_patterns_count']} detected")
            print(f"   Security Features: {len(data['data']['security_features'])} active")
        else:
            print(f"❌ Failed to get security status: {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_dangerous_code_detection():
    """Test detection of dangerous code patterns"""
    print("\n🚨 Testing Dangerous Code Detection...")
    
    dangerous_codes = [
        {
            "name": "OS Import",
            "code": "import os\nprint('Hello World')",
            "should_block": True
        },
        {
            "name": "Eval Function",
            "code": "result = eval('2 + 2')",
            "should_block": True
        },
        {
            "name": "Subprocess Import",
            "code": "import subprocess\nsubprocess.run(['ls'])",
            "should_block": True
        },
        {
            "name": "Safe Code",
            "code": "def hello():\n    return 'Hello World'",
            "should_block": False
        }
    ]
    
    for test_case in dangerous_codes:
        print(f"   Testing: {test_case['name']}")
        try:
            response = requests.post(f"{BASE_URL}/analyze", json={
                "code": test_case["code"],
                "language": "python"
            })
            
            if test_case["should_block"]:
                if response.status_code == 400:
                    print(f"   ✅ Correctly blocked dangerous code")
                else:
                    print(f"   ❌ Failed to block dangerous code: {response.status_code}")
            else:
                if response.status_code == 200:
                    print(f"   ✅ Safe code processed successfully")
                else:
                    print(f"   ❌ Safe code was blocked: {response.status_code}")
                    
        except Exception as e:
            print(f"   ❌ Error: {e}")

def test_code_size_limit():
    """Test code size limit"""
    print("\n📏 Testing Code Size Limit...")
    
    # Generate large code (over 100KB)
    large_code = "def test():\n    pass\n" * 10000  # This should be over 100KB
    
    try:
        response = requests.post(f"{BASE_URL}/analyze", json={
            "code": large_code,
            "language": "python"
        })
        
        if response.status_code == 400:
            print("   ✅ Code size limit enforced")
        else:
            print(f"   ❌ Code size limit not enforced: {response.status_code}")
            
    except Exception as e:
        print(f"   ❌ Error: {e}")

def test_rate_limiting():
    """Test rate limiting"""
    print("\n⏱️ Testing Rate Limiting...")
    
    # Make multiple requests quickly
    for i in range(12):  # More than the 10 request limit
        try:
            response = requests.post(f"{BASE_URL}/analyze", json={
                "code": f"def test{i}():\n    return {i}",
                "language": "python"
            })
            
            if response.status_code == 429:
                print(f"   ✅ Rate limit enforced after {i+1} requests")
                break
            elif response.status_code == 200:
                print(f"   Request {i+1}: ✅ Success")
            else:
                print(f"   Request {i+1}: ❌ Error {response.status_code}")
                
        except Exception as e:
            print(f"   Request {i+1}: ❌ Error: {e}")
        
        time.sleep(0.1)  # Small delay between requests

def test_suspicious_content_detection():
    """Test detection of suspicious content"""
    print("\n🔍 Testing Suspicious Content Detection...")
    
    suspicious_codes = [
        {
            "name": "Password in Code",
            "code": "password = 'secret123'\ndef login(): pass",
            "should_log": True
        },
        {
            "name": "API Key in Code", 
            "code": "api_key = 'sk-1234567890'\ndef call_api(): pass",
            "should_log": True
        },
        {
            "name": "Normal Code",
            "code": "def calculate(x, y):\n    return x + y",
            "should_log": False
        }
    ]
    
    for test_case in suspicious_codes:
        print(f"   Testing: {test_case['name']}")
        try:
            response = requests.post(f"{BASE_URL}/analyze", json={
                "code": test_case["code"],
                "language": "python"
            })
            
            if response.status_code == 200:
                print(f"   ✅ Code processed (check logs for suspicious content warnings)")
            else:
                print(f"   ❌ Code was blocked: {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")

def main():
    """Run all security tests"""
    print("🛡️ CodePitamah Security Test Suite")
    print("=" * 50)
    
    # Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/security-status", timeout=5)
        if response.status_code != 200:
            print("❌ Server not responding. Please start the backend server first.")
            return
    except:
        print("❌ Server not responding. Please start the backend server first.")
        return
    
    # Run tests
    test_security_status()
    test_dangerous_code_detection()
    test_code_size_limit()
    test_rate_limiting()
    test_suspicious_content_detection()
    
    print("\n" + "=" * 50)
    print("🏁 Security tests completed!")
    print("\n💡 Security Features Implemented:")
    print("   ✅ Input validation and sanitization")
    print("   ✅ Rate limiting (10 requests/minute per IP)")
    print("   ✅ Dangerous pattern detection")
    print("   ✅ Code size limits (100KB max)")
    print("   ✅ Analysis timeout protection (30 seconds)")
    print("   ✅ Security event logging")
    print("   ✅ Suspicious content detection")

if __name__ == "__main__":
    main()
