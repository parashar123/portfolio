from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Suraj Kumar Portfolio"
    VERSION: str = "1.0.0"
    
    # CORS Settings
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:5173",  # Vite dev server
        "http://localhost:5174",  # Vite dev server (alternative)
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002", 
        "http://127.0.0.1:3003",
        "http://127.0.0.1:5173",  # Vite dev server
        "http://127.0.0.1:5174",  # Vite dev server (alternative)
        "https://surajkumar.dev",
        "https://www.surajkumar.dev",
        "https://suraj-portfolio-ivory.vercel.app",  # Vercel frontend
        "https://suraj-portfolio-ivory.vercel.app",  # Explicit Vercel URL
        "*"  # Allow all origins for development
    ]
    
    ALLOWED_HOSTS: List[str] = [
        "localhost",
        "127.0.0.1",
        "surajkumar.dev",
        "www.surajkumar.dev"
    ]
    
    # Database Settings (Railway will provide these)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/portfolio")
    DATABASE_URL_TEST: str = os.getenv("DATABASE_URL_TEST", "postgresql://user:password@localhost:5432/portfolio_test")
    
    # Redis Settings (Railway will provide these)
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    REDIS_PASSWORD: str = os.getenv("REDIS_PASSWORD", "")
    
    # Security Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # ML Model Settings
    MODEL_CACHE_DIR: str = "./models"
    MAX_MODEL_SIZE_MB: int = 500
    
    # WebSocket Settings
    WS_HEARTBEAT_INTERVAL: int = 30
    WS_MAX_CONNECTIONS: int = 100
    
    # Monitoring Settings
    ENABLE_METRICS: bool = True
    METRICS_PORT: int = 9090
    
    # Development Settings
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()
