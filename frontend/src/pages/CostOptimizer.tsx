import { motion } from 'framer-motion'
import { DollarSign, TrendingDown, Calculator, BarChart3, PieChart, TrendingUp, Target, Zap } from 'lucide-react'
import { useCostOptimizationDashboard, useCostOptimizationRealTime } from '../hooks/useApi'
import { useCostOptimizationRealTime as useCostOptimizationWS } from '../hooks/useWebSocket'
import { FeatureStatusBanner } from '../components/StatusIndicator'
import ContactButtons from '../components/ContactButtons'

export default function CostOptimizer() {
  const { data: dashboardData, loading, error, refetch } = useCostOptimizationDashboard()
  const { isConnected, optimizationData } = useCostOptimizationWS()

  // Use real-time data if available, otherwise fall back to dashboard data
  const overview = optimizationData?.overview || dashboardData?.overview
  const awsAnalytics = optimizationData?.awsAnalytics || dashboardData?.awsAnalytics
  const roi = optimizationData?.roi || dashboardData?.roi

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-6">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-orange-500 animate-pulse' : 'bg-red-500'}`} />
            {isConnected ? 'Live Cost Analytics' : 'Offline Mode'}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-100 mb-4">
            <span className="gradient-text">Cost Optimization Engine</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            31% savings demonstration with AWS analytics, ROI calculations, and predictive cost modeling
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
            message="This cost optimization dashboard displays simulated data for demonstration purposes. Real implementation would connect to actual AWS billing APIs, cloud monitoring tools, and financial systems."
          />
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-dark-300">Loading cost optimization data...</span>
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

        {overview && (
          <>
            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            >
              <div className="metric-card">
                <TrendingDown size={24} className="text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">{overview.totalSavings}%</div>
                <div className="text-sm text-dark-400">Cost Reduction</div>
                <div className="text-xs text-green-400 mt-1">Total savings achieved</div>
              </div>
              
              <div className="metric-card">
                <Calculator size={24} className="text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">
                  ${(overview.annualSavings / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-dark-400">Annual Savings</div>
                <div className="text-xs text-green-400 mt-1">Year-over-year impact</div>
              </div>
              
              <div className="metric-card">
                <DollarSign size={24} className="text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">
                  ${(overview.monthlySavings / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-dark-400">Monthly Savings</div>
                <div className="text-xs text-green-400 mt-1">Recurring benefits</div>
              </div>
              
              <div className="metric-card">
                <Target size={24} className="text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">4</div>
                <div className="text-sm text-dark-400">Optimization Areas</div>
                <div className="text-xs text-green-400 mt-1">Active initiatives</div>
              </div>
            </motion.div>

            {/* Optimization Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-dark-100 mb-6">Optimization Areas</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {overview.optimizationAreas?.map((area, index) => (
                  <div key={index} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-dark-100">{area.area}</h3>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full">
                        {area.savings}% savings
                      </span>
                    </div>
                    
                    <p className="text-dark-300 text-sm mb-4">{area.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-dark-400">Before</span>
                        <span className="text-dark-100 font-medium">${area.beforeCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">After</span>
                        <span className="text-dark-100 font-medium">${area.afterCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-dark-700 pt-2">
                        <span className="text-green-400 font-medium">Monthly Savings</span>
                        <span className="text-green-400 font-bold">${area.monthlySavings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AWS Analytics */}
            {awsAnalytics && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-dark-100 mb-6">AWS Cost Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Current Month Overview */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">Current Month</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-dark-400">Total Cost</span>
                        <span className="text-dark-100 font-medium">${awsAnalytics.currentMonth.totalCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Previous Month</span>
                        <span className="text-dark-100 font-medium">${awsAnalytics.currentMonth.previousMonth.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Change</span>
                        <span className={`font-medium ${awsAnalytics.currentMonth.change < 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {awsAnalytics.currentMonth.change > 0 ? '+' : ''}{awsAnalytics.currentMonth.change}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Cost Breakdown */}
                    <div className="mt-6">
                      <h4 className="text-dark-100 font-medium mb-3">Cost Breakdown</h4>
                      <div className="space-y-2">
                        {Object.entries(awsAnalytics.currentMonth.breakdown).map(([service, percentage]) => (
                          <div key={service} className="flex items-center justify-between">
                            <span className="text-dark-400 capitalize">{service}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-dark-700 rounded-full h-2">
                                <div 
                                  className="bg-orange-500 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-dark-100 text-sm w-8">{percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Services */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">Top Services by Cost</h3>
                    <div className="space-y-3">
                      {awsAnalytics.topServices?.map((service, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                              <span className="text-orange-400 text-sm font-medium">{index + 1}</span>
                            </div>
                            <span className="text-dark-100 font-medium">{service.service}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-dark-100 font-medium">${service.cost.toLocaleString()}</div>
                            <div className="text-dark-400 text-sm">{service.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ROI Calculations */}
            {roi && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-dark-100 mb-6">ROI Analysis</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Investment */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">Investment</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-dark-400">Optimization Tools</span>
                        <span className="text-dark-100">${roi.investment.optimizationTools.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Consulting</span>
                        <span className="text-dark-100">${roi.investment.consulting.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Training</span>
                        <span className="text-dark-100">${roi.investment.training.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-dark-700 pt-2">
                        <span className="text-dark-100 font-medium">Total Investment</span>
                        <span className="text-dark-100 font-bold">${roi.investment.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Returns */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">Returns</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-dark-400">Year 1</span>
                        <span className="text-green-400">${roi.returns.year1.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Year 2</span>
                        <span className="text-green-400">${roi.returns.year2.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-400">Year 3</span>
                        <span className="text-green-400">${roi.returns.year3.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-dark-700 pt-2">
                        <span className="text-dark-100 font-medium">Total Returns</span>
                        <span className="text-green-400 font-bold">${roi.returns.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* ROI Metrics */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">ROI Metrics</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-1">{roi.roi.average}%</div>
                        <div className="text-dark-400 text-sm">Average ROI</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{roi.paybackPeriod}</div>
                        <div className="text-dark-400 text-sm">Payback Period</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">${(roi.npv / 1000000).toFixed(1)}M</div>
                        <div className="text-dark-400 text-sm">Net Present Value</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recommendations */}
            {overview.recommendations && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-dark-100 mb-6">Optimization Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {overview.recommendations.map((rec, index) => (
                    <div key={index} className="glass-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-dark-100">{rec.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          rec.effort === 'low' ? 'bg-green-500/20 text-green-400' :
                          rec.effort === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {rec.effort} effort
                        </span>
                      </div>
                      
                      <p className="text-dark-300 text-sm mb-4">{rec.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-dark-400">Potential Savings</span>
                          <span className="text-green-400 font-medium">{rec.potentialSavings}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Impact</span>
                          <span className={`font-medium ${
                            rec.impact === 'high' ? 'text-green-400' :
                            rec.impact === 'medium' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {rec.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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
              Need Cost Optimization Services?
            </h3>
            <p className="text-dark-300 mb-6">
              Let's discuss how to implement cost optimization strategies and achieve significant savings for your cloud infrastructure.
            </p>
            <ContactButtons context="costOptimization" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
