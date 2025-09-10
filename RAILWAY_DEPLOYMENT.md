# Railway Backend Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub
- Connect your GitHub account

### 2. Deploy Backend
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your `parashar123/portfolio` repository
- Select the `backend` folder as the root directory

### 3. Configure Environment Variables
Add these environment variables in Railway dashboard:

```
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://host:port
```

### 4. Railway Auto-Detection
Railway will automatically:
- Detect Python/FastAPI
- Install dependencies from `requirements-railway.txt`
- Start the app with `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 5. Get Your Backend URL
- Railway will provide a URL like: `https://your-app-name.railway.app`
- This is your backend API URL

### 6. Update Frontend API URL
Update your frontend to use the Railway backend URL:
- Go to Vercel dashboard
- Update environment variables
- Add: `VITE_API_URL=https://your-app-name.railway.app`

## 🔧 Configuration Files Created

- `railway.json` - Railway deployment config
- `Procfile` - Process definition
- `requirements-railway.txt` - Lightweight dependencies
- `start.sh` - Startup script

## 📊 Expected Endpoints

Once deployed, your backend will have:
- `GET /` - API info
- `GET /health` - Health check
- `GET /api/mlops/*` - MLOps endpoints
- `GET /api/architecture/*` - Architecture endpoints
- `GET /api/optimization/*` - Cost optimization endpoints
- `GET /api/codepitamah/*` - CodePitamah endpoints
- `GET /api/consulting/*` - Consulting endpoints
- `WS /ws` - WebSocket endpoint

## 🎯 Next Steps

1. Deploy to Railway
2. Get backend URL
3. Update frontend API configuration
4. Test all endpoints
5. Connect custom domain (optional)

## 💰 Railway Pricing

- **Free tier**: $5 credit monthly (enough for small apps)
- **Pro tier**: $20/month for production apps
- **Pay-as-you-go**: Only pay for what you use

For a portfolio backend, the free tier should be sufficient!
