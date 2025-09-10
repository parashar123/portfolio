import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Brain, 
  Network, 
  Code, 
  DollarSign, 
  Users,
  TrendingUp,
  Zap,
  Target,
  Award
} from 'lucide-react'
import StatusIndicator, { CodePitamahHighlight, FeatureStatusBanner } from '../components/StatusIndicator'
import ContactButtons from '../components/ContactButtons'

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const featureCards = [
  {
    icon: Brain,
    title: 'MLOps Studio',
    description: 'Real-time ML monitoring with drift detection and 92.1% accuracy',
    path: '/mlops-studio',
    color: 'from-blue-500 to-cyan-500',
    status: 'demo' as const,
    statusMessage: 'Demo data - Real implementation coming soon'
  },
  {
    icon: Network,
    title: 'Architecture Viz',
    description: '7 microservices across 180+ countries with team leadership context',
    path: '/architecture-viz',
    color: 'from-purple-500 to-pink-500',
    status: 'demo' as const,
    statusMessage: 'Demo data - Real implementation coming soon'
  },
  {
    icon: Code,
    title: 'CodePitamah',
    description: 'AI-powered code analysis with architecture generation',
    path: '/codepitamah',
    color: 'from-green-500 to-emerald-500',
    status: 'live' as const,
    statusMessage: 'Fully functional AI code analysis engine',
    isHighlighted: true
  },
  {
    icon: DollarSign,
    title: 'Cost Optimizer',
    description: '31% savings demonstration with AWS analytics and ROI calculations',
    path: '/cost-optimizer',
    color: 'from-orange-500 to-red-500',
    status: 'demo' as const,
    statusMessage: 'Demo data - Real implementation coming soon'
  },
  {
    icon: Users,
    title: 'Consulting Hub',
    description: '$2.5M+ contract impact with client success stories',
    path: '/consulting-hub',
    color: 'from-indigo-500 to-purple-500',
    status: 'demo' as const,
    statusMessage: 'Demo data - Real implementation coming soon'
  }
]

const stats = [
  { label: 'ML Accuracy', value: '92.1%', icon: Target },
  { label: 'Cost Savings', value: '31%', icon: TrendingUp },
  { label: 'Contract Impact', value: '$2.5M+', icon: Award },
  { label: 'Response Time', value: '<12ms', icon: Zap }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(51,65,85,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex flex-col items-center space-y-4 mb-6">
                <CodePitamahHighlight />
                <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse mr-2" />
                  Live Portfolio - Interactive Demo
                </div>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">Suraj Kumar</span>
              <br />
              <span className="text-dark-100">Enterprise ML Engineer</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl sm:text-2xl text-dark-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Building intelligent systems that drive{' '}
              <span className="text-primary-400 font-semibold">$2.5M+</span> in business impact.
              <br />
              Specializing in ML/AI, full-stack development, and enterprise architecture.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              {/* Animated CodePitamah Button - Always Active */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: [1.05, 1.1, 1.05],
                  opacity: 1,
                  boxShadow: [
                    "0 20px 40px rgba(59, 130, 246, 0.3)",
                    "0 25px 50px rgba(59, 130, 246, 0.5)",
                    "0 20px 40px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeOut",
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 30px 60px rgba(59, 130, 246, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: [1.1, 1.2, 1.1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-lg blur-md -z-10"
                />
                <Link
                  to="/codepitamah"
                  className="btn-primary flex items-center space-x-2 group relative overflow-hidden"
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      backgroundPosition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className="bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-[length:200%_100%] bg-clip-text text-transparent font-bold text-lg"
                  >
                    Try CodePitamah AI
                  </motion.span>
                  <motion.div
                    animate={{
                      x: [0, 8, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight size={22} className="text-white" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -right-2"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <StatusIndicator status="live" size="sm" />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Animated Consulting Button */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/consulting-hub"
                  className="btn-secondary flex items-center space-x-2 group"
                >
                  <span>View Consulting Impact</span>
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Users size={20} />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="metric-card text-center">
                  <Icon size={24} className="text-primary-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-dark-100 mb-1">{value}</div>
                  <div className="text-sm text-dark-400">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Interactive Portfolio Sections
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Explore my expertise through interactive demonstrations and real-time data visualizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map(({ icon: Icon, title, description, path, color, status, statusMessage, isHighlighted }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Link to={path} className="block">
                  <motion.div 
                    className={`interactive-card p-8 h-full ${isHighlighted ? 'ring-2 ring-green-500/30 bg-green-500/5' : ''}`}
                    whileHover={{
                      boxShadow: isHighlighted 
                        ? "0 20px 40px rgba(34, 197, 94, 0.2)" 
                        : "0 10px 30px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center ${isHighlighted ? 'animate-pulse' : ''}`}
                        animate={isHighlighted ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        } : {}}
                        transition={isHighlighted ? {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                      >
                        <motion.div
                          animate={isHighlighted ? {
                            scale: [1, 1.2, 1],
                          } : {}}
                          transition={isHighlighted ? {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          } : {}}
                        >
                          <Icon size={24} className="text-white" />
                        </motion.div>
                      </motion.div>
                      <StatusIndicator status={status} size="sm" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-dark-100 mb-3 group-hover:text-primary-400 transition-colors">
                      {title}
                      {isHighlighted && (
                        <motion.span 
                          className="ml-2 text-green-400"
                          animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          ✨
                        </motion.span>
                      )}
                    </h3>
                    
                    <p className="text-dark-300 mb-4 leading-relaxed">
                      {description}
                    </p>
                    
                    <FeatureStatusBanner 
                      status={status} 
                      message={statusMessage}
                      className="mb-4"
                    />
                    
                    <div className="flex items-center text-primary-400 font-medium group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Let's discuss how we can leverage ML/AI to drive your business forward
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Animated Contact Buttons */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ 
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur-sm -z-10"
                />
                <ContactButtons context="general" variant="hero" />
              </motion.div>

              {/* Animated Case Studies Button */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ 
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/consulting-hub"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>View Case Studies</span>
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Users size={20} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
