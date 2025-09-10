from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from datetime import datetime, timedelta

router = APIRouter()

def generate_consulting_projects() -> List[Dict[str, Any]]:
    """Generate consulting projects data"""
    return [
        {
            "id": "project_001",
            "client": "Fortune 500 Healthcare Company",
            "title": "ML-Powered Patient Risk Assessment",
            "description": "Developed and deployed ML models for early patient risk detection, reducing readmission rates by 35%",
            "technologies": ["Python", "TensorFlow", "AWS", "Docker", "Kubernetes"],
            "duration": "6 months",
            "impact": {
                "id": "impact_001",
                "metric": "Patient Readmission Rate",
                "before": 15.2,
                "after": 9.9,
                "improvement": 35,
                "unit": "%",
                "description": "Reduced patient readmission rates through predictive analytics"
            },
            "testimonial": {
                "id": "testimonial_001",
                "client": "Dr. Sarah Johnson",
                "role": "Chief Medical Officer",
                "company": "HealthTech Solutions",
                "content": "Suraj's ML implementation transformed our patient care approach. The 35% reduction in readmissions has saved us millions while improving patient outcomes.",
                "rating": 5,
                "date": "2024-01-15"
            },
            "status": "completed"
        },
        {
            "id": "project_002",
            "client": "Global E-commerce Platform",
            "title": "Real-time Recommendation Engine",
            "description": "Built scalable ML recommendation system serving 2M+ daily users with 92% accuracy",
            "technologies": ["Python", "Apache Spark", "Redis", "Kafka", "AWS EKS"],
            "duration": "8 months",
            "impact": {
                "id": "impact_002",
                "metric": "Conversion Rate",
                "before": 2.8,
                "after": 4.2,
                "improvement": 50,
                "unit": "%",
                "description": "Increased conversion rates through personalized recommendations"
            },
            "testimonial": {
                "id": "testimonial_002",
                "client": "Michael Chen",
                "role": "VP of Engineering",
                "company": "ShopGlobal",
                "content": "The recommendation engine Suraj built increased our revenue by $2.5M annually. His technical expertise and leadership were exceptional.",
                "rating": 5,
                "date": "2023-11-20"
            },
            "status": "completed"
        },
        {
            "id": "project_003",
            "client": "Financial Services Corporation",
            "title": "Fraud Detection System",
            "description": "Implemented real-time fraud detection reducing false positives by 60% while maintaining 99.8% accuracy",
            "technologies": ["Python", "XGBoost", "Apache Kafka", "PostgreSQL", "Docker"],
            "duration": "4 months",
            "impact": {
                "id": "impact_003",
                "metric": "False Positive Rate",
                "before": 8.5,
                "after": 3.4,
                "improvement": 60,
                "unit": "%",
                "description": "Reduced false positives in fraud detection"
            },
            "testimonial": {
                "id": "testimonial_003",
                "client": "Jennifer Martinez",
                "role": "Head of Risk Management",
                "company": "SecureBank",
                "content": "Suraj's fraud detection system saved us $1.8M in operational costs while improving customer experience. Highly recommended!",
                "rating": 5,
                "date": "2023-09-10"
            },
            "status": "completed"
        },
        {
            "id": "project_004",
            "client": "Manufacturing Giant",
            "title": "Predictive Maintenance Platform",
            "description": "Built IoT-based predictive maintenance system reducing equipment downtime by 45%",
            "technologies": ["Python", "Prophet", "InfluxDB", "Grafana", "AWS IoT"],
            "duration": "5 months",
            "impact": {
                "id": "impact_004",
                "metric": "Equipment Downtime",
                "before": 12.5,
                "after": 6.9,
                "improvement": 45,
                "unit": "%",
                "description": "Reduced equipment downtime through predictive maintenance"
            },
            "testimonial": {
                "id": "testimonial_004",
                "client": "Robert Thompson",
                "role": "Operations Director",
                "company": "ManufacturePro",
                "content": "The predictive maintenance system Suraj developed has revolutionized our operations. The 45% reduction in downtime is remarkable.",
                "rating": 5,
                "date": "2023-07-25"
            },
            "status": "completed"
        }
    ]

def generate_business_impact() -> List[Dict[str, Any]]:
    """Generate business impact data"""
    return [
        {
            "id": "impact_001",
            "metric": "Total Contract Value",
            "before": 0,
            "after": 2500000,
            "improvement": 2500000,
            "unit": "$",
            "description": "Total value of consulting contracts delivered"
        },
        {
            "id": "impact_002",
            "metric": "Client Satisfaction",
            "before": 0,
            "after": 4.9,
            "improvement": 4.9,
            "unit": "/5",
            "description": "Average client satisfaction rating"
        },
        {
            "id": "impact_003",
            "metric": "Project Success Rate",
            "before": 0,
            "after": 100,
            "improvement": 100,
            "unit": "%",
            "description": "Percentage of projects delivered on time and within budget"
        },
        {
            "id": "impact_004",
            "metric": "Cost Savings Delivered",
            "before": 0,
            "after": 8500000,
            "improvement": 8500000,
            "unit": "$",
            "description": "Total cost savings delivered to clients"
        },
        {
            "id": "impact_005",
            "metric": "Revenue Impact",
            "before": 0,
            "after": 12500000,
            "improvement": 12500000,
            "unit": "$",
            "description": "Total revenue impact for clients"
        }
    ]

def generate_testimonials() -> List[Dict[str, Any]]:
    """Generate client testimonials"""
    return [
        {
            "id": "testimonial_001",
            "client": "Dr. Sarah Johnson",
            "role": "Chief Medical Officer",
            "company": "HealthTech Solutions",
            "content": "Suraj's ML implementation transformed our patient care approach. The 35% reduction in readmissions has saved us millions while improving patient outcomes.",
            "rating": 5,
            "date": "2024-01-15"
        },
        {
            "id": "testimonial_002",
            "client": "Michael Chen",
            "role": "VP of Engineering",
            "company": "ShopGlobal",
            "content": "The recommendation engine Suraj built increased our revenue by $2.5M annually. His technical expertise and leadership were exceptional.",
            "rating": 5,
            "date": "2023-11-20"
        },
        {
            "id": "testimonial_003",
            "client": "Jennifer Martinez",
            "role": "Head of Risk Management",
            "company": "SecureBank",
            "content": "Suraj's fraud detection system saved us $1.8M in operational costs while improving customer experience. Highly recommended!",
            "rating": 5,
            "date": "2023-09-10"
        },
        {
            "id": "testimonial_004",
            "client": "Robert Thompson",
            "role": "Operations Director",
            "company": "ManufacturePro",
            "content": "The predictive maintenance system Suraj developed has revolutionized our operations. The 45% reduction in downtime is remarkable.",
            "rating": 5,
            "date": "2023-07-25"
        },
        {
            "id": "testimonial_005",
            "client": "Lisa Wang",
            "role": "CTO",
            "company": "TechStartup Inc",
            "content": "Suraj helped us scale our ML infrastructure from prototype to production. His expertise in MLOps was invaluable for our growth.",
            "rating": 5,
            "date": "2023-05-12"
        }
    ]

@router.get("/projects")
async def get_consulting_projects():
    """Get consulting projects"""
    try:
        projects = generate_consulting_projects()
        return {
            "success": True,
            "data": projects,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/impact")
async def get_business_impact():
    """Get business impact metrics"""
    try:
        impact = generate_business_impact()
        return {
            "success": True,
            "data": impact,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/testimonials")
async def get_testimonials():
    """Get client testimonials"""
    try:
        testimonials = generate_testimonials()
        return {
            "success": True,
            "data": testimonials,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard")
async def get_consulting_dashboard():
    """Get complete consulting dashboard data"""
    try:
        dashboard_data = {
            "projects": generate_consulting_projects(),
            "impact": generate_business_impact(),
            "testimonials": generate_testimonials()
        }
        return {
            "success": True,
            "data": dashboard_data,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats")
async def get_consulting_stats():
    """Get consulting statistics summary"""
    try:
        stats = {
            "totalProjects": 4,
            "totalValue": 2500000,
            "averageRating": 5.0,
            "successRate": 100,
            "totalSavings": 8500000,
            "totalRevenue": 12500000,
            "yearsExperience": 8,
            "technologies": 25,
            "industries": 6
        }
        return {
            "success": True,
            "data": stats,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
