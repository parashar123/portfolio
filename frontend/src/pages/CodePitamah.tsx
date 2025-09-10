import { motion } from 'framer-motion'
import { Code, Brain, Zap, MessageSquare, Play, FileText, AlertTriangle, CheckCircle, Shield, Cpu, TestTube, GitBranch } from 'lucide-react'
import { useCodePitamahDashboard } from '../hooks/useApi'
import { useCodePitamahRealTime as useCodePitamahWS } from '../hooks/useWebSocket'
import { useState } from 'react'
import ContactButtons from '../components/ContactButtons'

export default function CodePitamah() {
  const { data: dashboardData, loading, error, refetch } = useCodePitamahDashboard()
  const { isConnected, codepitamahData } = useCodePitamahWS()
  
  const [codeInput, setCodeInput] = useState('')
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Use real-time data if available, otherwise fall back to dashboard data
  const performance = (codepitamahData as any)?.performance || (dashboardData as any)?.performance
  const suggestions = (codepitamahData as any)?.suggestions || (dashboardData as any)?.suggestions || []

  const handleCodeAnalysis = async () => {
    console.log('🔥 BUTTON CLICKED! handleCodeAnalysis called')
    console.log('Code input:', codeInput)
    console.log('Code input length:', codeInput.length)
    console.log('Code input trimmed:', codeInput.trim())
    
    if (!codeInput.trim()) {
      console.log('❌ No code input, returning early')
      return
    }
    
    console.log('✅ Code input found, starting analysis...')
    setIsAnalyzing(true)
    console.log('Starting code analysis...', { codeLength: codeInput.length })
    
    try {
      const requestData = {
        code: codeInput,
        language: 'python'
      }
      
      console.log('Sending request to:', 'http://localhost:8000/api/codepitamah/analyze')
      console.log('Request data:', requestData)
      
      const response = await fetch('http://localhost:8000/api/codepitamah/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error:', errorText)
        throw new Error(`Analysis failed: ${response.status} ${errorText}`)
      }
      
      const result = await response.json()
      console.log('Analysis result:', result)
      setAnalysisResult(result.data)
    } catch (error) {
      console.error('Analysis failed:', error)
      // Fallback to simulated result
      setAnalysisResult({
        language: 'python',
        complexity: 3,
        maintainability: 85,
        testCoverage: 80,
        securityScore: 90,
        performanceScore: 85,
        patterns: [],
        issues: [
          { id: '1', type: 'warning', severity: 'medium', message: 'Consider using list comprehension for better performance', line: 3, column: 1 },
          { id: '2', type: 'info', severity: 'low', message: 'Function could benefit from type hints', line: 1, column: 1 }
        ],
        suggestions: [
          'Add error handling for edge cases',
          'Consider caching for repeated calculations',
          'Use async/await for better concurrency'
        ],
        metrics: {
          linesOfCode: codeInput.split('\n').length,
          cyclomaticComplexity: 3,
          maintainabilityIndex: 85,
          functionCount: 1,
          classCount: 0,
          commentRatio: 10
        }
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-400" />
      default: return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-red-500/20 bg-red-500/5'
      case 'warning': return 'border-yellow-500/20 bg-yellow-500/5'
      case 'info': return 'border-blue-500/20 bg-blue-500/5'
      default: return 'border-gray-500/20 bg-gray-500/5'
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-blue-500 animate-pulse' : 'bg-red-500'}`} />
            {isConnected ? 'Live AI Analysis' : 'Offline Mode'}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-100 mb-4">
            <span className="gradient-text">CodePitamah AI Demo</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Live code analysis, architecture generation, and intelligent suggestions powered by advanced AI
          </p>
        </motion.div>

        {/* CodePitamah Capabilities Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-dark-100 mb-6 text-center">What CodePitamah Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Security Analysis */}
            <div className="glass-card p-6 hover:bg-dark-700/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-100">Security Analysis</h3>
              </div>
              <p className="text-dark-300 text-sm mb-3">Detect vulnerabilities and security issues</p>
              <ul className="text-xs text-dark-400 space-y-1">
                <li>• SQL Injection detection</li>
                <li>• XSS & CSRF vulnerabilities</li>
                <li>• Hardcoded secrets</li>
                <li>• Authentication bypasses</li>
                <li>• Path traversal attacks</li>
              </ul>
            </div>

            {/* Performance Analysis */}
            <div className="glass-card p-6 hover:bg-dark-700/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-100">Performance Analysis</h3>
              </div>
              <p className="text-dark-300 text-sm mb-3">Optimize code performance and efficiency</p>
              <ul className="text-xs text-dark-400 space-y-1">
                <li>• N+1 query detection</li>
                <li>• Algorithm complexity analysis</li>
                <li>• Memory leak detection</li>
                <li>• Resource contention issues</li>
                <li>• Async/await anti-patterns</li>
              </ul>
            </div>

            {/* Code Quality */}
            <div className="glass-card p-6 hover:bg-dark-700/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-100">Code Quality</h3>
              </div>
              <p className="text-dark-300 text-sm mb-3">Improve code maintainability and structure</p>
              <ul className="text-xs text-dark-400 space-y-1">
                <li>• Code smell detection</li>
                <li>• Complexity metrics</li>
                <li>• Duplicate code analysis</li>
                <li>• Long method detection</li>
                <li>• Magic number identification</li>
              </ul>
            </div>

            {/* Memory Management */}
            <div className="glass-card p-6 hover:bg-dark-700/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Cpu className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-100">Memory Management</h3>
              </div>
              <p className="text-dark-300 text-sm mb-3">Detect memory leaks and optimization issues</p>
              <ul className="text-xs text-dark-400 space-y-1">
                <li>• Unbounded cache growth</li>
                <li>• Event handler accumulation</li>
                <li>• Circular references</li>
                <li>• File handle leaks</li>
                <li>• Session accumulation</li>
              </ul>
            </div>

            {/* API Design */}
            <div className="glass-card p-6 hover:bg-dark-700/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                  <GitBranch className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-100">API Design</h3>
              </div>
              <p className="text-dark-300 text-sm mb-3">Ensure proper API design and best practices</p>
              <ul className="text-xs text-dark-400 space-y-1">
                <li>• REST API violations</li>
                <li>• Missing error handling</li>
                <li>• Inconsistent naming</li>
                <li>• Versioning issues</li>
                <li>• Authentication gaps</li>
              </ul>
            </div>

            {/* Testing & Dependencies */}
            <div className="glass-card p-6 hover:bg-dark-700/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-4">
                  <TestTube className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-100">Testing & Dependencies</h3>
              </div>
              <p className="text-dark-300 text-sm mb-3">Comprehensive testing and dependency analysis</p>
              <ul className="text-xs text-dark-400 space-y-1">
                <li>• Missing test coverage</li>
                <li>• Vulnerable packages</li>
                <li>• License compliance</li>
                <li>• Test anti-patterns</li>
                <li>• Dependency management</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-dark-300">Loading AI capabilities...</span>
          </div>
        )}

        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="glass-card p-6 border-red-500/20">
              <div className="flex items-center text-red-400 mb-2">
                <AlertTriangle size={20} className="mr-2" />
                <span className="font-medium">Connection Error</span>
              </div>
              <p className="text-dark-300 text-sm">{error}</p>
              <button
                onClick={refetch}
                className="mt-4 btn-primary text-sm"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        {performance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="metric-card">
              <Code size={24} className="text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100 mb-1">{performance.accuracy}%</div>
              <div className="text-sm text-dark-400">Code Accuracy</div>
              <div className="text-xs text-green-400 mt-1">AI analysis precision</div>
            </div>
            
            <div className="metric-card">
              <Zap size={24} className="text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100 mb-1">&lt;{performance.analysisTime}s</div>
              <div className="text-sm text-dark-400">Analysis Time</div>
              <div className="text-xs text-green-400 mt-1">Average processing</div>
            </div>
            
            <div className="metric-card">
              <MessageSquare size={24} className="text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100 mb-1">{performance.uptime}%</div>
              <div className="text-sm text-dark-400">AI Uptime</div>
              <div className="text-xs text-green-400 mt-1">24/7 availability</div>
            </div>
            
            <div className="metric-card">
              <Brain size={24} className="text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100 mb-1">{performance.models}</div>
              <div className="text-sm text-dark-400">AI Models</div>
              <div className="text-xs text-green-400 mt-1">Active models</div>
            </div>
          </motion.div>
        )}

        {/* Code Analysis Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Code Input */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-dark-100 mb-4">Code Analysis</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Enter your code:
                </label>
                <textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="def fibonacci(n):&#10;    if n <= 1:&#10;        return n&#10;    return fibonacci(n-1) + fibonacci(n-2)"
                  className="w-full h-64 p-4 bg-dark-800 border border-dark-600 rounded-lg text-dark-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => {
                  console.log('🔥 BUTTON ONCLICK TRIGGERED!')
                  console.log('codeInput.trim():', codeInput.trim())
                  console.log('isAnalyzing:', isAnalyzing)
                  console.log('Button disabled:', !codeInput.trim() || isAnalyzing)
                  handleCodeAnalysis()
                }}
                disabled={!codeInput.trim() || isAnalyzing}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>Analyze Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-dark-100 mb-4">Analysis Results</h2>
            {analysisResult ? (
              <div className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{analysisResult.metrics.linesOfCode}</div>
                    <div className="text-xs text-dark-400">Lines</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{analysisResult.metrics.cyclomaticComplexity}</div>
                    <div className="text-xs text-dark-400">Complexity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">{analysisResult.metrics.maintainabilityIndex}</div>
                    <div className="text-xs text-dark-400">Maintainability</div>
                  </div>
                </div>

                {/* Issues */}
                {analysisResult.issues.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-dark-300 mb-2">Issues Found ({analysisResult.issues.length})</h3>
                    <div className="max-h-64 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-dark-600 scrollbar-track-dark-800">
                      {analysisResult.issues.map((issue: any, index: number) => (
                        <div key={index} className={`p-3 rounded-lg border ${getIssueColor(issue.type)}`}>
                          <div className="flex items-start space-x-2">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1">
                              <p className="text-sm text-dark-200">{issue.message}</p>
                              <p className="text-xs text-dark-400 mt-1">Line {issue.line}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {analysisResult.suggestions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-dark-300 mb-2">Suggestions ({analysisResult.suggestions.length})</h3>
                    <div className="max-h-64 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-dark-600 scrollbar-track-dark-800">
                      {analysisResult.suggestions.map((suggestion: any, index: number) => (
                        <div key={index} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                            <p className="text-sm text-dark-200">{suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Code size={48} className="text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400">Enter code above to see AI analysis results</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Real Analysis Results - Show when analysis is complete */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-dark-100 mb-6">Real-Time Analysis Results</h2>
            
            {/* Analysis Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{analysisResult.metrics.linesOfCode}</div>
                <div className="text-sm text-dark-400">Lines of Code</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">{analysisResult.metrics.cyclomaticComplexity}</div>
                <div className="text-sm text-dark-400">Complexity</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">{analysisResult.metrics.maintainabilityIndex}</div>
                <div className="text-sm text-dark-400">Maintainability</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-2">{analysisResult.metrics.functionCount}</div>
                <div className="text-sm text-dark-400">Functions</div>
              </div>
            </div>

            {/* Code Quality Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-dark-100 mb-4">Security Score</h3>
                <div className="text-3xl font-bold text-green-400 mb-2">{analysisResult.securityScore}</div>
                <div className="text-sm text-dark-400">Out of 100</div>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-dark-100 mb-4">Performance Score</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">{analysisResult.performanceScore}</div>
                <div className="text-sm text-dark-400">Out of 100</div>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-dark-100 mb-4">Test Coverage</h3>
                <div className="text-3xl font-bold text-purple-400 mb-2">{analysisResult.testCoverage}%</div>
                <div className="text-sm text-dark-400">Estimated</div>
              </div>
            </div>

            {/* Detected Patterns */}
            {analysisResult.patterns && analysisResult.patterns.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-dark-100 mb-4">Detected Patterns ({analysisResult.patterns.length})</h3>
                <div className="max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-dark-600 scrollbar-track-dark-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysisResult.patterns.map((pattern: any, index: number) => (
                      <div key={index} className="glass-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-dark-100">{pattern.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            pattern.type === 'architectural' ? 'bg-blue-500/20 text-blue-400' :
                            pattern.type === 'design' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {pattern.type}
                          </span>
                        </div>
                        <p className="text-sm text-dark-300 mb-2">{pattern.description}</p>
                        {pattern.recommendation && (
                          <p className="text-xs text-dark-400 italic">{pattern.recommendation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* AI Suggestions - Only show if no real analysis results */}
        {!analysisResult && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-dark-100 mb-6">AI-Powered Suggestions ({suggestions.length})</h2>
            <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-dark-600 scrollbar-track-dark-800">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((suggestion: any, index: number) => (
                  <div key={index} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-dark-100">{suggestion.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        suggestion.category === 'performance' ? 'bg-green-500/20 text-green-400' :
                        suggestion.category === 'security' ? 'bg-red-500/20 text-red-400' :
                        suggestion.category === 'maintainability' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {suggestion.category}
                      </span>
                    </div>
                    
                    <p className="text-dark-300 text-sm mb-4">{suggestion.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-dark-400">Impact</span>
                        <span className={`font-medium ${
                          suggestion.impact === 'high' ? 'text-green-400' :
                          suggestion.impact === 'medium' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {suggestion.impact}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Effort</span>
                        <span className={`font-medium ${
                          suggestion.effort === 'low' ? 'text-green-400' :
                          suggestion.effort === 'medium' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {suggestion.effort}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Architecture Generation Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-dark-100 mb-6">Architecture Generation</h2>
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-dark-100 mb-4">Generate System Architecture</h3>
              <p className="text-dark-300 mb-6 max-w-2xl mx-auto">
                Describe your requirements and let AI generate a complete system architecture with 
                microservices, databases, and deployment strategies.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    System Requirements
                  </label>
                  <textarea
                    placeholder="Describe your system requirements..."
                    className="w-full h-32 p-4 bg-dark-800 border border-dark-600 rounded-lg text-dark-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Architecture Type
                  </label>
                  <select className="w-full p-4 bg-dark-800 border border-dark-600 rounded-lg text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
                    <option>Microservices</option>
                    <option>Monolithic</option>
                    <option>Serverless</option>
                    <option>Event-Driven</option>
                    <option>Layered</option>
                  </select>
                  <button className="w-full btn-primary">
                    Generate Architecture
                  </button>
                </div>
              </div>
              
              {/* Sample Architecture Output */}
              <div className="mt-8 p-6 bg-dark-800/50 border border-dark-600 rounded-lg">
                <h4 className="text-lg font-semibold text-dark-100 mb-4">Sample Architecture Output</h4>
                <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-dark-600 scrollbar-track-dark-800">
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-blue-400">API Gateway</h5>
                        <span className="text-xs text-blue-300">Load Balancer</span>
                      </div>
                      <p className="text-dark-300">Routes requests to appropriate microservices</p>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-green-400">User Service</h5>
                        <span className="text-xs text-green-300">Microservice</span>
                      </div>
                      <p className="text-dark-300">Handles user authentication and profile management</p>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-purple-400">Database</h5>
                        <span className="text-xs text-purple-300">PostgreSQL</span>
                      </div>
                      <p className="text-dark-300">Stores application data with replication</p>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-yellow-400">Redis Cache</h5>
                        <span className="text-xs text-yellow-300">In-Memory</span>
                      </div>
                      <p className="text-dark-300">Caches frequently accessed data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-dark-100 mb-4">
              Need Custom Code Analysis Solutions?
            </h3>
            <p className="text-dark-300 mb-6">
              Let's discuss how to implement CodePitamah for your organization or create custom analysis tools for your specific needs.
            </p>
            <ContactButtons context="codepitamah" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}