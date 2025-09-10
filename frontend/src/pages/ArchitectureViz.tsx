import { motion } from 'framer-motion'
import { Network, Users, Globe, TrendingUp, Server, Activity, AlertTriangle, Zap } from 'lucide-react'
import { useArchitectureDashboard, useArchitectureRealTime } from '../hooks/useApi'
import { useArchitectureRealTime as useArchitectureWS } from '../hooks/useWebSocket'
import { FeatureStatusBanner } from '../components/StatusIndicator'
import ContactButtons from '../components/ContactButtons'

export default function ArchitectureViz() {
  const { data: dashboardData, loading, error, refetch } = useArchitectureDashboard()
  const { isConnected, architectureData } = useArchitectureWS()

  // Use real-time data if available, otherwise fall back to dashboard data
  const services = architectureData?.services || dashboardData?.services || []
  const global = architectureData?.global || dashboardData?.global || []
  const leadership = dashboardData?.leadership || null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/20'
      case 'degraded': return 'text-yellow-400 bg-yellow-500/20'
      case 'down': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <Activity className="w-4 h-4" />
      case 'degraded': return <AlertTriangle className="w-4 h-4" />
      case 'down': return <AlertTriangle className="w-4 h-4" />
      default: return <Server className="w-4 h-4" />
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
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-purple-500 animate-pulse' : 'bg-red-500'}`} />
            {isConnected ? 'Live Architecture' : 'Offline Mode'}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-100 mb-4">
            <span className="gradient-text">Architecture Visualizer</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Global microservices architecture with team leadership context and real-time performance metrics
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
            message="This architecture visualization displays simulated data for demonstration purposes. Real implementation would connect to actual microservices, monitoring systems, and team management tools."
          />
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="ml-2 text-dark-300">Loading architecture data...</span>
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

        {services.length > 0 && (
          <>
            {/* Global Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            >
              <div className="metric-card">
                <Network size={24} className="text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">{services.length}</div>
                <div className="text-sm text-dark-400">Microservices</div>
                <div className="text-xs text-green-400 mt-1">
                  {services.filter(s => s.status === 'healthy').length} healthy
                </div>
              </div>
              
              <div className="metric-card">
                <Globe size={24} className="text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">{global.length}</div>
                <div className="text-sm text-dark-400">Regions</div>
                <div className="text-xs text-green-400 mt-1">99.9% avg uptime</div>
              </div>
              
              <div className="metric-card">
                <Users size={24} className="text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">{leadership?.teamSize || 16}</div>
                <div className="text-sm text-dark-400">Engineers</div>
                <div className="text-xs text-green-400 mt-1">Cross-functional teams</div>
              </div>
              
              <div className="metric-card">
                <Zap size={24} className="text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">
                  {Math.round(services.reduce((acc, s) => acc + s.latency, 0) / services.length)}ms
                </div>
                <div className="text-sm text-dark-400">Avg Latency</div>
                <div className="text-xs text-green-400 mt-1">Global performance</div>
              </div>
            </motion.div>

            {/* Microservices Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-dark-100 mb-6">Microservices Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div key={service.id} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-dark-100">{service.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getStatusColor(service.status)}`}>
                        {getStatusIcon(service.status)}
                        <span className="capitalize">{service.status}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-dark-400">Latency</span>
                        <span className="text-dark-100 font-medium">{service.latency}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Throughput</span>
                        <span className="text-dark-100 font-medium">{service.throughput.toLocaleString()}/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Error Rate</span>
                        <span className="text-dark-100 font-medium">{service.errorRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">CPU Usage</span>
                        <span className="text-dark-100 font-medium">{service.cpuUsage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Memory</span>
                        <span className="text-dark-100 font-medium">{service.memoryUsage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Global Performance */}
            {global.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-dark-100 mb-6">Global Performance</h2>
                <div className="glass-card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {global.map((region, index) => (
                      <div key={index} className="text-center">
                        <h3 className="text-lg font-semibold text-dark-100 mb-4">{region.region}</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="text-2xl font-bold text-primary-400">{region.latency}ms</div>
                            <div className="text-sm text-dark-400">Latency</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-400">{region.uptime}%</div>
                            <div className="text-sm text-dark-400">Uptime</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-400">{(region.users / 1000000).toFixed(1)}M</div>
                            <div className="text-sm text-dark-400">Users</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-400">${(region.revenue / 1000000).toFixed(1)}M</div>
                            <div className="text-sm text-dark-400">Revenue</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team Leadership Context */}
            {leadership && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-dark-100 mb-6">Team Leadership Context</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Project Timeline */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">Project Timeline</h3>
                    <div className="space-y-4">
                      {leadership.projectTimeline.map((phase, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-2 ${
                            phase.status === 'completed' ? 'bg-green-500' :
                            phase.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="text-dark-100 font-medium">{phase.phase}</h4>
                            <p className="text-dark-400 text-sm">{phase.description}</p>
                            <p className="text-dark-500 text-xs">
                              {phase.startDate} - {phase.endDate || 'Ongoing'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Decisions */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">Key Decisions</h3>
                    <div className="space-y-4">
                      {leadership.decisions.map((decision, index) => (
                        <div key={index} className="border-l-2 border-primary-500 pl-4">
                          <h4 className="text-dark-100 font-medium">{decision.title}</h4>
                          <p className="text-dark-400 text-sm mb-2">{decision.description}</p>
                          <div className="text-green-400 text-sm font-medium">{decision.impact}</div>
                          <div className="text-dark-500 text-xs">{decision.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Business Outcomes */}
                <div className="mt-8 glass-card p-6">
                  <h3 className="text-lg font-semibold text-dark-100 mb-4">Business Outcomes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {leadership.outcomes.map((outcome, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-2">
                          {outcome.improvement > 0 ? '+' : ''}{outcome.improvement}{outcome.unit}
                        </div>
                        <div className="text-dark-100 font-medium mb-1">{outcome.metric}</div>
                        <div className="text-dark-400 text-sm">
                          {outcome.before} → {outcome.after}
                        </div>
                      </div>
                    ))}
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
              Need Architecture Design Services?
            </h3>
            <p className="text-dark-300 mb-6">
              Let's discuss how to design scalable microservices architecture and team leadership strategies for your organization.
            </p>
            <ContactButtons context="architecture" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
