import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, Clock } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import CalendarModal from '../CalendarModal'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [now, setNow] = useState(new Date())
  const { ui } = useAppStore()

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
              onClick={() => setIsMobileMenuOpen(true)}
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
            <div className="flex justify-center space-x-6">
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
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        calendlyUrl="https://calendly.com/parasharsuraj123/30min"
      />
    </motion.header>
  )
}
