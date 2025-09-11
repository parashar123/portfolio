import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, Clock, Home, Users, TrendingUp, Code, Activity, Brain, Network, DollarSign } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { Link, useLocation } from 'react-router-dom'
import CalendarModal from '../CalendarModal'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [now, setNow] = useState(new Date())
  const { ui, setActiveSection } = useAppStore()
  const location = useLocation()

  const navigationItems = [
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

  const moreNavigationItems = [
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

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatted = new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
    timeZoneName: 'short'
  }).format(now)

  const socialLinks = [
    { icon: Github, href: 'https://github.com/parashar123', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/surajkumar3', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:pitamah.techinsights@gmail.com', label: 'Email' }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-card border-b border-dark-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SK</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Suraj Kumar</h1>
              <p className="text-sm text-dark-400">Enterprise ML Engineer</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Live Time Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 text-sm text-dark-300"
            >
              <Clock size={16} className="text-primary-400" />
              <span className="font-mono">{formatted}</span>
            </motion.div>
            
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="px-3 py-1.5 rounded-md border border-dark-600 hover:border-primary-500 text-sm transition-colors duration-200"
            >
              Book a call
            </button>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark-400 hover:text-primary-400 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dark-700/50 py-4"
          >
            {/* Navigation Items - Show only remaining items */}
            <div className="space-y-2 mb-6">
              {navigationItems.slice(3).map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap]
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className="block"
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-primary-600 text-white' 
                          : item.highlight 
                            ? 'text-primary-400 hover:text-primary-300 hover:bg-primary-500/10 border border-primary-500/30'
                            : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-75">{item.description}</div>
                      </div>
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
                          className="text-yellow-400 text-lg"
                        >
                          ✨
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                )
              })}
              
              {/* More Items */}
              <div className="pt-2 border-t border-dark-700/50">
                <div className="text-xs text-dark-400 px-4 py-2">More Tools</div>
                {moreNavigationItems.map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap]
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => {
                        setActiveSection(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className="block"
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-primary-600 text-white' 
                            : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                          }
                        `}
                      >
                        <Icon size={18} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs opacity-75">{item.description}</div>
                        </div>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-secondary-500 text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Book a Call Button */}
            <div className="pt-4 border-t border-dark-700/50">
              <button
                onClick={() => {
                  setIsCalendarOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full px-4 py-3 rounded-lg border border-primary-500/30 text-primary-400 hover:bg-primary-500/10 transition-colors duration-200"
              >
                Book a Call
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-4 border-t border-dark-700/50">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Status Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        calendlyUrl="https://calendly.com/parasharsuraj123/30min"
      />
    </motion.header>
  )
}
