import { motion } from 'framer-motion'
import { Brain, Activity, TrendingUp, AlertTriangle, RefreshCw, Zap } from 'lucide-react'
import { useMLOpsDashboard, useMLOpsRealTime } from '../hooks/useApi'
import { useMLOpsRealTime as useMLOpsWS } from '../hooks/useWebSocket'
import { FeatureStatusBanner } from '../components/StatusIndicator'
import ContactButtons from '../components/ContactButtons'

export default function MLOpsStudio() {
  const { data: dashboardData, loading, error, refetch } = useMLOpsDashboard()
  const { isConnected, mlopsData } = useMLOpsWS()

  // Use real-time data if available, otherwise fall back to dashboard data
  const metrics = mlopsData || dashboardData?.metrics
  const models = dashboardData?.models || []
  const drift = dashboardData?.drift || null

  const handleRetrain = async () => {
    try {
      // This would trigger retraining in a real implementation
      await refetch()
    } catch (error) {
      console.error('Failed to trigger retraining:', error)
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
          <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-primary-500 animate-pulse' : 'bg-red-500'}`} />
            {isConnected ? 'Live MLOps Dashboard' : 'Offline Mode'}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-100 mb-4">
            <span className="gradient-text">MLOps Pipeline Studio</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Real-time ML monitoring with drift detection, model performance tracking, and automated retraining
          </p>
        </motion.div>

        {/* Demo Data Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <FeatureStatusBanner 
            status="demo"
            message="This MLOps dashboard displays simulated data for demonstration purposes. Real implementation would connect to actual ML pipelines, model registries, and monitoring systems."
          />
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <RefreshCw className="w-8 h-8 text-primary-400 animate-spin" />
            <span className="ml-2 text-dark-300">Loading MLOps data...</span>
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

        {metrics && (
          <>
            {/* Real-time Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            >
              <div className="metric-card">
                <Activity size={24} className="text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">
                  {metrics.throughput?.toLocaleString() || '2K+'}
                </div>
                <div className="text-sm text-dark-400">Predictions/sec</div>
                <div className="text-xs text-green-400 mt-1">+5.2% from last hour</div>
              </div>
              
              <div className="metric-card">
                <TrendingUp size={24} className="text-secondary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">
                  {metrics.accuracy || '92.1'}%
                </div>
                <div className="text-sm text-dark-400">Model Accuracy</div>
                <div className="text-xs text-green-400 mt-1">+0.3% from yesterday</div>
              </div>
              
              <div className="metric-card">
                <Zap size={24} className="text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">
                  &lt;{metrics.latency || '12'}ms
                </div>
                <div className="text-sm text-dark-400">P99 Latency</div>
                <div className="text-xs text-green-400 mt-1">-2ms improvement</div>
              </div>
              
              <div className="metric-card">
                <Brain size={24} className="text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">
                  ${(metrics.costSavings / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-dark-400">Quarterly Savings</div>
                <div className="text-xs text-green-400 mt-1">31% cost reduction</div>
              </div>
            </motion.div>

            {/* Model Performance */}
            {models.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-dark-100 mb-6">Model Performance</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {models.map((model, index) => (
                    <div key={model.id} className="glass-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-dark-100">{model.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          model.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          model.status === 'training' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {model.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-dark-400">Accuracy</span>
                          <span className="text-dark-100 font-medium">{model.accuracy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Precision</span>
                          <span className="text-dark-100 font-medium">{model.precision}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Recall</span>
                          <span className="text-dark-100 font-medium">{model.recall}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">F1 Score</span>
                          <span className="text-dark-100 font-medium">{model.f1Score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Drift Detection */}
            {drift && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-dark-100 mb-6">Drift Detection</h2>
                <div className="glass-card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-dark-100 mb-4">Feature Drift Scores</h3>
                      <div className="space-y-3">
                        {drift.driftScores?.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-dark-400">{item.feature}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-dark-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    item.status === 'normal' ? 'bg-green-500' :
                                    item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(item.score * 1000, 100)}%` }}
                                />
                              </div>
                              <span className={`text-xs ${
                                item.status === 'normal' ? 'text-green-400' :
                                item.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {item.score.toFixed(3)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-dark-100 mb-4">Retraining Status</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-dark-400">Status</span>
                          <span className="text-green-400 font-medium capitalize">
                            {drift.retrainingStatus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-dark-400">Last Check</span>
                          <span className="text-dark-100 text-sm">
                            {new Date(drift.lastCheck).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={handleRetrain}
                          className="w-full btn-primary text-sm"
                        >
                          Trigger Retraining
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-dark-100 mb-4">
              Interested in MLOps Implementation?
            </h3>
            <p className="text-dark-300 mb-6">
              Let's discuss how to implement real-time ML monitoring and automated retraining for your business.
            </p>
            <ContactButtons context="mlops" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
