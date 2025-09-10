import { motion } from 'framer-motion'
import { Users, TrendingUp, Award, DollarSign, Star, Calendar, Target, BarChart3 } from 'lucide-react'
import { useConsultingDashboard, useConsultingStats } from '../hooks/useApi'
import { FeatureStatusBanner } from '../components/StatusIndicator'
import ContactButtons from '../components/ContactButtons'

export default function ConsultingHub() {
  const { data: dashboardData, loading, error, refetch } = useConsultingDashboard()
  const { data: statsData } = useConsultingStats()

  // Use dashboard data
  const projects = dashboardData?.projects || []
  const impact = dashboardData?.impact || null
  const testimonials = dashboardData?.testimonials || []
  const stats = statsData || null

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400'
      case 'planning': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getImpactColor = (value: number, threshold: number) => {
    return value >= threshold ? 'text-green-400' : 'text-yellow-400'
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
            <Users size={16} className="mr-2" />
            Consulting Impact
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-100 mb-4">
            <span className="gradient-text">Consulting Impact Hub</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            $2.5M+ contract impact with enterprise clients, team leadership, and measurable business outcomes
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
            message="This consulting hub displays simulated data for demonstration purposes. Real implementation would connect to actual project management systems, client databases, and financial tracking tools."
          />
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-2 text-dark-300">Loading consulting data...</span>
          </div>
        )}

        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="glass-card p-6 border-red-500/20">
              <div className="flex items-center text-red-400 mb-2">
                <BarChart3 size={20} className="mr-2" />
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

        {/* Key Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="metric-card">
              <DollarSign size={24} className="text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100 mb-1">${(stats.totalContractValue / 1000000).toFixed(1)}M+</div>
              <div className="text-sm text-dark-400">Contract Impact</div>
              <div className="text-xs text-green-400 mt-1">Total value delivered</div>
            </div>
            
            <div className="metric-card">
              <Users size={24} className="text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100 mb-1">{stats.teamSize}</div>
              <div className="text-sm text-dark-400">Team Members</div>
              <div className="text-xs text-green-400 mt-1">Cross-functional teams</div>
            </div>
            
            <div className="metric-card">
              <Award size={24} className="text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100 mb-1">{stats.clientSatisfaction}%</div>
              <div className="text-sm text-dark-400">Client Satisfaction</div>
              <div className="text-xs text-green-400 mt-1">Average rating</div>
            </div>
            
            <div className="metric-card">
              <Target size={24} className="text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-dark-100 mb-1">{stats.projectsCompleted}</div>
              <div className="text-sm text-dark-400">Projects Completed</div>
              <div className="text-xs text-green-400 mt-1">Successful deliveries</div>
            </div>
          </motion.div>
        )}

        {/* Impact Metrics */}
        {impact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-dark-100 mb-6">Business Impact</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Improvements */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-dark-100 mb-4">Performance Improvements</h3>
                <div className="space-y-4">
                  {impact.performanceImprovements?.map((improvement, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-dark-400">{improvement.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${getImpactColor(improvement.improvement, 20)}`}>
                          +{improvement.improvement}%
                        </span>
                        <div className="w-16 bg-dark-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min(improvement.improvement, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Savings */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-dark-100 mb-4">Cost Savings</h3>
                <div className="space-y-4">
                  {impact.costSavings?.map((saving, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-dark-400">{saving.area}</span>
                      <div className="text-right">
                        <div className="text-green-400 font-medium">${(saving.amount / 1000).toFixed(0)}K</div>
                        <div className="text-dark-400 text-sm">{saving.percentage}% reduction</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Portfolio */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-dark-100 mb-6">Project Portfolio</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-dark-100">{project.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getProjectStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-dark-300 text-sm mb-4">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-dark-400">Client</span>
                      <span className="text-dark-100 font-medium">{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-400">Duration</span>
                      <span className="text-dark-100 font-medium">{project.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-400">Value</span>
                      <span className="text-green-400 font-medium">${(project.value / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-400">Team Size</span>
                      <span className="text-dark-100 font-medium">{project.teamSize} members</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-dark-700">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Client Testimonials */}
        {testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-dark-100 mb-6">Client Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-dark-600'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-dark-300 text-sm mb-4 italic">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {testimonial.client.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-dark-100 font-medium text-sm">{testimonial.client}</div>
                      <div className="text-dark-400 text-xs">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Leadership Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-dark-100 mb-6">Leadership Achievements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Team Development */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-dark-100 mb-4">Team Development</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Engineers Mentored</span>
                  <span className="text-blue-400 font-medium">12+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Promotions Facilitated</span>
                  <span className="text-green-400 font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Team Satisfaction</span>
                  <span className="text-purple-400 font-medium">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Retention Rate</span>
                  <span className="text-orange-400 font-medium">96%</span>
                </div>
              </div>
            </div>

            {/* Process Improvements */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-dark-100 mb-4">Process Improvements</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Deployment Frequency</span>
                  <span className="text-green-400 font-medium">+300%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Bug Reduction</span>
                  <span className="text-green-400 font-medium">-65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Time to Market</span>
                  <span className="text-green-400 font-medium">-40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Code Quality Score</span>
                  <span className="text-blue-400 font-medium">+25%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-dark-100 mb-4">Ready to Transform Your Business?</h2>
            <p className="text-dark-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how my expertise in ML/AI and full-stack development can drive measurable results for your organization.
            </p>
            <ContactButtons context="consulting" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}