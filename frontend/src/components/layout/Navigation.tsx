import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
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
    id: 'codepitamah',
    label: 'CodePitamah',
    path: '/codepitamah',
    icon: 'Code',
    description: 'AI-powered code analysis and architecture generation'
  },
  {
    id: 'mlops-studio',
    label: 'MLOps Studio',
    path: '/mlops-studio',
    icon: 'Brain',
    description: 'Real-time ML monitoring and drift detection',
    badge: 'Live'
  },
  {
    id: 'architecture-viz',
    label: 'Architecture',
    path: '/architecture-viz',
    icon: 'Network',
    description: 'Global microservices and team leadership'
  },
  {
    id: 'cost-optimizer',
    label: 'Cost Optimizer',
    path: '/cost-optimizer',
    icon: 'DollarSign',
    description: '31% savings demonstration with AWS analytics'
  },
  {
    id: 'consulting-hub',
    label: 'Consulting',
    path: '/consulting-hub',
    icon: 'Users',
    description: '$2.5M+ contract impact and client stories'
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
                      flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-primary-600 text-white' 
                        : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-secondary-500 text-white rounded-full">
                        {item.badge}
                      </span>
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
          </div>

          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="lg:hidden flex items-center space-x-1 overflow-x-auto scrollbar-hide">
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
                      flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-primary-600 text-white' 
                        : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                      }
                    `}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-xs bg-secondary-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                </Link>
              )
            })}
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
