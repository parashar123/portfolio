from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import asyncio
import json
from typing import List

from app.core.config import settings
from app.api import mlops, architecture, optimization, codepitamah, consulting
from app.services.websocket_manager import WebSocketManager

# WebSocket manager instance
websocket_manager = WebSocketManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting Suraj Kumar Portfolio Backend...")
    yield
    # Shutdown
    print("🛑 Shutting down backend...")

app = FastAPI(
    title="Suraj Kumar Portfolio API",
    description="Interactive portfolio backend with ML/AI demonstrations",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Trusted host middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS
)

# Include API routers
app.include_router(mlops.router, prefix="/api/mlops", tags=["MLOps"])
app.include_router(architecture.router, prefix="/api/architecture", tags=["Architecture"])
app.include_router(optimization.router, prefix="/api/optimization", tags=["Cost Optimization"])
app.include_router(codepitamah.router, prefix="/api/codepitamah", tags=["CodePitamah"])
app.include_router(consulting.router, prefix="/api/consulting", tags=["Consulting"])

@app.get("/")
async def root():
    return {
        "message": "Suraj Kumar Portfolio API",
        "version": "1.0.0",
        "status": "active",
        "health": "healthy",
        "endpoints": {
            "health": "/health",
            "mlops": "/api/mlops",
            "architecture": "/api/architecture", 
            "optimization": "/api/optimization",
            "codepitamah": "/api/codepitamah",
            "consulting": "/api/consulting",
            "websocket": "/ws"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "Suraj Kumar Portfolio API is running",
        "version": "1.0.0"
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_manager.connect(websocket)
    try:
        while True:
            # Keep connection alive and handle incoming messages
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message.get("type") == "subscribe":
                channel = message.get("channel")
                if channel:
                    await websocket_manager.subscribe(websocket, channel)
                    await websocket_manager.send_personal_message(
                        json.dumps({"type": "subscribed", "channel": channel}), 
                        websocket
                    )
            elif message.get("type") == "unsubscribe":
                channel = message.get("channel")
                if channel:
                    await websocket_manager.unsubscribe(websocket, channel)
                    await websocket_manager.send_personal_message(
                        json.dumps({"type": "unsubscribed", "channel": channel}), 
                        websocket
                    )
            else:
                # Echo back the message
                await websocket_manager.send_personal_message(data, websocket)
                
    except WebSocketDisconnect:
        websocket_manager.disconnect(websocket)
    except json.JSONDecodeError:
        await websocket_manager.send_personal_message("Invalid JSON format", websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        websocket_manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
