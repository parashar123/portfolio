# Interactive Portfolio with CodePitamah AI

A modern, interactive portfolio showcasing ML/AI expertise and full-stack development capabilities, featuring **CodePitamah** - an AI-powered code analysis engine.

## Features

### **CodePitamah AI Engine**
- **Real-time Code Analysis**: Instant feedback on code quality
- **Algorithm Efficiency Detection**: O(n²), exponential complexity, and performance anti-patterns
- **Security Vulnerability Scanning**: SQL injection, XSS, path traversal detection
- **Memory Leak Detection**: Unbounded growth, event handler accumulation
- **Code Quality Metrics**: Complexity, maintainability, and best practices

### **Interactive Portfolio**
- **Modern UI/UX**: React + TypeScript + Tailwind CSS
- **Real-time Demos**: Live CodePitamah analysis
- **Mobile Responsive**: Optimized for all devices
- **PWA Support**: Installable web app
- **WhatsApp Integration**: Direct contact via WhatsApp

### **Technical Stack**
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Python 3.11, WebSocket support
- **Analysis Engine**: AST parsing, complexity analysis, security scanning
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/parashar123/portfolio.git
cd portfolio
```

2. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

3. **Setup Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## CodePitamah Capabilities

### Algorithm Efficiency Analysis
- **O(n²) Detection**: Nested loops, bubble sort, duplicate detection
- **Exponential Complexity**: Recursive Fibonacci, overlapping subproblems
- **Performance Anti-patterns**: List concatenation, manual grouping
- **Optimization Suggestions**: Built-in functions, data structures

### Security Analysis
- **SQL Injection**: String interpolation in queries
- **XSS Vulnerabilities**: Unsafe HTML rendering
- **Path Traversal**: File system access vulnerabilities
- **Hardcoded Secrets**: API keys, passwords, tokens

### Memory Management
- **Memory Leaks**: Unbounded cache growth, event handler accumulation
- **Resource Management**: File handles, database connections
- **Performance Issues**: Large object creation, inefficient data structures

## Development

### Project Structure
```
portfolio/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API and WebSocket services
│   │   └── utils/         # Utility functions
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── services/     # Business logic
│   │   └── core/         # Configuration
└── docs/              # Documentation
```

### Key Components
- **CodePitamah Engine**: `backend/app/services/code_analyzer.py`
- **API Endpoints**: `backend/app/api/codepitamah.py`
- **Frontend Interface**: `frontend/src/pages/CodePitamah.tsx`
- **WebSocket Manager**: `backend/app/services/websocket_manager.py`

## Performance Metrics

- **Page Load Time**: < 2 seconds
- **API Response Time**: < 500ms
- **Code Analysis Time**: < 10 seconds
- **Uptime**: > 99.5%

## Security Features

- **Rate Limiting**: 5 requests/minute per IP
- **Code Size Limits**: 50KB maximum
- **Analysis Timeout**: 30 seconds
- **Dangerous Pattern Detection**: Blocks malicious code
- **CORS Protection**: Domain-specific origins

## Deployment

### Frontend (Vercel)
```bash
# Connect to Vercel
# Automatic deployment on push to main
# Custom domain support
```

### Backend (Railway)
```bash
# Connect to Railway
# Automatic deployment on push to main
# Environment variable configuration
```

## Contact

- **WhatsApp**: [Direct Chat](https://wa.me/919035767307)
- **Email**: pitamah.techinsights@gmail.com
- **Portfolio**: [Live Demo](https://your-domain.vercel.app)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with modern web technologies
- Inspired by the need for better code analysis tools
- Designed for developer productivity and code quality

---

**Made with ❤️ by Suraj Kumar**
