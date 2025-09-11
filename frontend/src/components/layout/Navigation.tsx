import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { 
  Home, 
  Brain, 
  Network, 
  Code, 
  DollarSign, 
  Users,
  Activity,
  TrendingUp
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { NavigationItem } from '../../types'

const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    description: 'Overview and introduction'
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    icon: 'Users',
    description: 'Learn about my journey and values',
    highlight: true
  },
  {
    id: 'experience',
    label: 'Experience',
    path: '/experience',
    icon: 'TrendingUp',
    description: '9+ years of professional journey',
    highlight: true
  },
  {
    id: 'codepitamah',
    label: 'CodePitamah',
    path: '/codepitamah',
    icon: 'Code',
    description: 'AI-powered code analysis and architecture generation'
  },
  {
    id: 'consulting-hub',
    label: 'Consulting',
    path: '/consulting-hub',
    icon: 'Users',
    description: 'Proven business impact and client success stories'
  }
]

const moreNavigationItems: NavigationItem[] = [
  {
    id: 'mlops-studio',
    label: 'MLOps Studio',
    path: '/mlops-studio',
    icon: 'Brain',
    description: 'Real-time ML monitoring and drift detection',
    badge: 'Demo'
  },
  {
    id: 'architecture-viz',
    label: 'Architecture',
    path: '/architecture-viz',
    icon: 'Network',
    description: 'Global microservices and team leadership',
    badge: 'Demo'
  },
  {
    id: 'cost-optimizer',
    label: 'Cost Optimizer',
    path: '/cost-optimizer',
    icon: 'DollarSign',
    description: '31% savings demonstration with AWS analytics',
    badge: 'Demo'
  },
  {
    id: 'blog',
    label: 'Blog',
    path: '/blog',
    icon: 'Activity',
    description: 'Articles and notes'
  }
]

const iconMap = {
  Home,
  Brain,
  Network,
  Code,
  DollarSign,
  Users,
  Activity,
  TrendingUp
}

export default function Navigation() {
  const location = useLocation()
  const { ui, setActiveSection } = useAppStore()
  const [openMore, setOpenMore] = useState(false)
  const moreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!moreRef.current) return
      if (openMore && !moreRef.current.contains(e.target as Node)) {
        setOpenMore(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openMore])

  return (
    <nav className="sticky top-16 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveSection(item.id)}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative
                      ${isActive 
                        ? 'bg-primary-600 text-white' 
                        : item.highlight 
                          ? 'text-primary-400 hover:text-primary-300 hover:bg-primary-500/10 border border-primary-500/30'
                          : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                      }
                    `}
                  >
                    {item.highlight && !isActive && (
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg blur-sm -z-10"
                      />
                    )}
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-secondary-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.highlight && !isActive && (
                      <motion.span
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-yellow-400 ml-1"
                      >
                        ✨
                      </motion.span>
                    )}
                  </motion.div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-dark-800 text-dark-100 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-800" />
                  </div>
                </Link>
              )
            })}
            {/* Group less used links under More */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setOpenMore(v => !v)
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-dark-800/50 transition-all duration-200"
              >
                <Activity size={18} />
                <span className="font-medium">More</span>
              </button>
              <AnimatePresence>
                {openMore && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-52 bg-dark-800 border border-primary-500/30 rounded-lg shadow-2xl z-50 overflow-hidden backdrop-blur-sm"
                  >
                    {moreNavigationItems.map((item) => {
                      const Icon = iconMap[item.icon as keyof typeof iconMap]
                      return (
                        <Link 
                          key={item.id}
                          to={item.path} 
                          className="flex items-center space-x-3 px-4 py-3 text-dark-200 hover:bg-dark-700 hover:text-primary-400 transition-colors duration-200"
                          onClick={() => {
                            setOpenMore(false)
                            setActiveSection(item.id)
                          }}
                        >
                          <Icon size={16} />
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto px-2 py-1 text-xs bg-secondary-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Navigation - Scrollable Design */}
          <div className="lg:hidden w-full">
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide pb-1">
              {/* All Navigation Items in a scrollable row */}
              {navigationItems.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap]
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setActiveSection(item.id)}
                    className="flex-shrink-0"
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 relative whitespace-nowrap
                        ${isActive 
                          ? 'bg-primary-600 text-white' 
                          : item.highlight 
                            ? 'text-primary-400 hover:text-primary-300 hover:bg-primary-500/10 border border-primary-500/30'
                            : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                        }
                      `}
                    >
                      {item.highlight && !isActive && (
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg blur-sm -z-10"
                        />
                      )}
                      <Icon size={16} />
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.highlight && !isActive && (
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-yellow-400 ml-1 text-sm"
                        >
                          ✨
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                )
              })}
              
              {/* More Button */}
              <div className="flex-shrink-0 relative" ref={moreRef}>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenMore(v => !v)
                  }}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-dark-300 hover:text-primary-400 hover:bg-dark-800/50 transition-all duration-200"
                >
                  <Activity size={16} />
                  <span className="text-sm font-medium">More</span>
                </button>
              <AnimatePresence>
                {openMore && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-dark-800 border border-primary-500/30 rounded-lg shadow-2xl z-50 overflow-hidden backdrop-blur-sm"
                  >
                    {moreNavigationItems.map((item) => {
                      const Icon = iconMap[item.icon as keyof typeof iconMap]
                      return (
                        <Link 
                          key={item.id}
                          to={item.path} 
                          className="flex items-center space-x-2 px-3 py-3 text-dark-200 hover:bg-dark-700 hover:text-primary-400 transition-colors duration-200"
                          onClick={() => {
                            setOpenMore(false)
                            setActiveSection(item.id)
                          }}
                        >
                          <Icon size={14} />
                          <span className="text-sm">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto px-1.5 py-0.5 text-xs bg-secondary-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Live Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
              <span className="text-dark-400">Live Data</span>
            </div>
            <div className="w-px h-4 bg-dark-600" />
            <div className="text-dark-400">
              <span className="text-primary-400 font-medium">92.1%</span> Accuracy
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
