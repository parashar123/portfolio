import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/parashar123', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/surajkumar3', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:pitamah.techinsights@gmail.com', label: 'Email' }
  ]

  const quickLinks = [
    { label: 'MLOps Studio', href: '/mlops-studio' },
    { label: 'Architecture', href: '/architecture-viz' },
    { label: 'CodePitamah', href: '/codepitamah' },
    { label: 'Cost Optimizer', href: '/cost-optimizer' },
    { label: 'Consulting', href: '/consulting-hub' }
  ]

  return (
    <footer className="bg-dark-800/50 border-t border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SK</span>
              </div>
              <div>
                <h3 className="text-lg font-bold gradient-text">Suraj Kumar</h3>
                <p className="text-sm text-dark-400">Enterprise ML Engineer</p>
              </div>
            </motion.div>
            
            <p className="text-dark-300 text-sm leading-relaxed">
              Building intelligent systems that drive business impact. 
              Specializing in ML/AI, full-stack development, and enterprise architecture.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-dark-400 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-700/50"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-dark-100">Portfolio Sections</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-dark-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Stats */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-dark-100">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-400" />
                <a 
                  href="mailto:pitamah.techinsights@gmail.com"
                  className="text-dark-300 hover:text-primary-400 transition-colors text-sm"
                >
                  pitamah.techinsights@gmail.com
                </a>
              </div>
              
              <div className="pt-4 space-y-2">
                <div className="text-sm text-dark-400">
                  <span className="text-primary-400 font-medium">$2.5M+</span> Contract Impact
                </div>
                <div className="text-sm text-dark-400">
                  <span className="text-secondary-400 font-medium">31%</span> Cost Reduction
                </div>
                <div className="text-sm text-dark-400">
                  <span className="text-accent-400 font-medium">92.1%</span> ML Accuracy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-dark-700/50 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-dark-400">
            <span>© {currentYear} Suraj Kumar. Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>and cutting-edge technology.</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-dark-400">
            <span>Built with React, TypeScript & Tailwind</span>
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
            <span>Live Portfolio</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
