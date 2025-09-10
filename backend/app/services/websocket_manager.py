from fastapi import WebSocket
from typing import List, Dict, Set
import json
import asyncio
import logging
import random
from datetime import datetime

logger = logging.getLogger(__name__)

class WebSocketManager:
    def __init__(self):
        # Store active connections
        self.active_connections: List[WebSocket] = []
        # Store subscriptions by channel
        self.subscriptions: Dict[str, Set[WebSocket]] = {}
        # Real-time data broadcasting
        self.broadcast_task = None
        self.is_broadcasting = False
        
    async def connect(self, websocket: WebSocket):
        """Accept a new WebSocket connection"""
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket connected. Total connections: {len(self.active_connections)}")
        
        # Start broadcasting if not already started
        if not self.is_broadcasting and self.active_connections:
            self.is_broadcasting = True
            self.broadcast_task = asyncio.create_task(self.start_data_broadcast())
        
    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket connection"""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            
        # Remove from all subscriptions
        for channel, connections in self.subscriptions.items():
            connections.discard(websocket)
            
        logger.info(f"WebSocket disconnected. Total connections: {len(self.active_connections)}")
        
        # Stop broadcasting if no connections left
        if not self.active_connections and self.is_broadcasting:
            self.is_broadcasting = False
            if self.broadcast_task:
                self.broadcast_task.cancel()
        
    async def subscribe(self, websocket: WebSocket, channel: str):
        """Subscribe a connection to a channel"""
        if channel not in self.subscriptions:
            self.subscriptions[channel] = set()
        self.subscriptions[channel].add(websocket)
        logger.info(f"WebSocket subscribed to channel: {channel}")
        
    async def unsubscribe(self, websocket: WebSocket, channel: str):
        """Unsubscribe a connection from a channel"""
        if channel in self.subscriptions:
            self.subscriptions[channel].discard(websocket)
        logger.info(f"WebSocket unsubscribed from channel: {channel}")
        
    async def send_personal_message(self, message: str, websocket: WebSocket):
        """Send a message to a specific WebSocket connection"""
        try:
            await websocket.send_text(message)
        except Exception as e:
            logger.error(f"Error sending personal message: {e}")
            self.disconnect(websocket)
            
    async def broadcast_to_channel(self, message: str, channel: str):
        """Broadcast a message to all connections subscribed to a channel"""
        if channel not in self.subscriptions:
            return
            
        disconnected = []
        for websocket in self.subscriptions[channel]:
            try:
                await websocket.send_text(message)
            except Exception as e:
                logger.error(f"Error broadcasting to channel {channel}: {e}")
                disconnected.append(websocket)
                
        # Clean up disconnected connections
        for websocket in disconnected:
            self.disconnect(websocket)
            
    async def broadcast_to_all(self, message: str):
        """Broadcast a message to all active connections"""
        disconnected = []
        for websocket in self.active_connections:
            try:
                await websocket.send_text(message)
            except Exception as e:
                logger.error(f"Error broadcasting to all: {e}")
                disconnected.append(websocket)
                
        # Clean up disconnected connections
        for websocket in disconnected:
            self.disconnect(websocket)
            
    async def send_mlops_metrics(self, metrics: dict):
        """Send MLOps metrics to subscribed connections"""
        message = json.dumps({
            "type": "mlops_metrics",
            "data": metrics,
            "timestamp": "2024-01-01T00:00:00Z"
        })
        await self.broadcast_to_channel(message, "mlops")
        
    async def send_architecture_metrics(self, metrics: dict):
        """Send architecture metrics to subscribed connections"""
        message = json.dumps({
            "type": "architecture_metrics", 
            "data": metrics,
            "timestamp": "2024-01-01T00:00:00Z"
        })
        await self.broadcast_to_channel(message, "architecture")
        
    async def send_cost_optimization_data(self, data: dict):
        """Send cost optimization data to subscribed connections"""
        message = json.dumps({
            "type": "cost_optimization",
            "data": data,
            "timestamp": "2024-01-01T00:00:00Z"
        })
        await self.broadcast_to_channel(message, "optimization")
        
    async def send_codepitamah_analysis(self, analysis: dict):
        """Send CodePitamah analysis to subscribed connections"""
        message = json.dumps({
            "type": "codepitamah_analysis",
            "data": analysis,
            "timestamp": "2024-01-01T00:00:00Z"
        })
        await self.broadcast_to_channel(message, "codepitamah")
    
    async def start_data_broadcast(self):
        """Start broadcasting real-time data to subscribed clients"""
        while self.is_broadcasting:
            try:
                # Broadcast MLOps data
                await self.broadcast_mlops_data()
                
                # Broadcast Architecture data
                await self.broadcast_architecture_data()
                
                # Broadcast Cost Optimization data
                await self.broadcast_optimization_data()
                
                # Broadcast CodePitamah data
                await self.broadcast_codepitamah_data()
                
                # Wait before next broadcast
                await asyncio.sleep(5)  # Broadcast every 5 seconds
                
            except Exception as e:
                logger.error(f"Error in data broadcast: {e}")
                await asyncio.sleep(10)  # Wait longer on error
    
    async def broadcast_mlops_data(self):
        """Generate and broadcast MLOps metrics"""
        data = {
            "type": "mlops_metrics",
            "data": {
                "throughput": random.randint(1800, 2200),
                "accuracy": round(random.uniform(91.5, 92.8), 1),
                "latency": random.randint(8, 15),
                "costSavings": random.randint(180000, 220000),
                "timestamp": datetime.now().isoformat()
            }
        }
        message = json.dumps(data)
        await self.broadcast_to_channel(message, "mlops")
    
    async def broadcast_architecture_data(self):
        """Generate and broadcast architecture metrics"""
        services = [
            {"id": f"service_{i}", "name": f"Service {i}", "status": random.choice(["healthy", "degraded"]), 
             "latency": random.randint(10, 50), "throughput": random.randint(1000, 5000),
             "errorRate": round(random.uniform(0.1, 2.0), 1), "cpuUsage": random.randint(20, 80),
             "memoryUsage": random.randint(30, 90)}
            for i in range(1, 8)
        ]
        
        data = {
            "type": "architecture_metrics",
            "data": {
                "services": services,
                "timestamp": datetime.now().isoformat()
            }
        }
        message = json.dumps(data)
        await self.broadcast_to_channel(message, "architecture")
    
    async def broadcast_optimization_data(self):
        """Generate and broadcast cost optimization data"""
        data = {
            "type": "cost_optimization",
            "data": {
                "totalSavings": random.randint(28, 35),
                "monthlySavings": random.randint(180000, 220000),
                "annualSavings": random.randint(2200000, 2800000),
                "timestamp": datetime.now().isoformat()
            }
        }
        message = json.dumps(data)
        await self.broadcast_to_channel(message, "optimization")
    
    async def broadcast_codepitamah_data(self):
        """Generate and broadcast CodePitamah analysis data"""
        data = {
            "type": "codepitamah_analysis",
            "data": {
                "accuracy": random.randint(94, 97),
                "analysisTime": round(random.uniform(1.5, 2.5), 1),
                "uptime": random.randint(99, 100),
                "models": random.randint(3, 5),
                "timestamp": datetime.now().isoformat()
            }
        }
        message = json.dumps(data)
        await self.broadcast_to_channel(message, "codepitamah")
