import { motion } from 'framer-motion'
import { CheckCircle, Clock, AlertTriangle, Zap } from 'lucide-react'

interface StatusIndicatorProps {
  status: 'live' | 'demo' | 'coming-soon' | 'beta'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export default function StatusIndicator({ 
  status, 
  size = 'md', 
  showIcon = true, 
  className = '' 
}: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'live':
        return {
          icon: CheckCircle,
          text: 'Live',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-400',
          iconColor: 'text-green-400',
          pulse: true
        }
      case 'demo':
        return {
          icon: AlertTriangle,
          text: 'Demo Data',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30',
          textColor: 'text-yellow-400',
          iconColor: 'text-yellow-400',
          pulse: false
        }
      case 'coming-soon':
        return {
          icon: Clock,
          text: 'Coming Soon',
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          textColor: 'text-blue-400',
          iconColor: 'text-blue-400',
          pulse: false
        }
      case 'beta':
        return {
          icon: Zap,
          text: 'Beta',
          bgColor: 'bg-purple-500/20',
          borderColor: 'border-purple-500/30',
          textColor: 'text-purple-400',
          iconColor: 'text-purple-400',
          pulse: true
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex items-center space-x-1.5 rounded-full border
        ${config.bgColor} ${config.borderColor} ${sizeClasses[size]}
        ${className}
      `}
    >
      {showIcon && (
        <Icon 
          size={iconSizes[size]} 
          className={`${config.iconColor} ${config.pulse ? 'animate-pulse' : ''}`}
        />
      )}
      <span className={`font-medium ${config.textColor}`}>
        {config.text}
      </span>
    </motion.div>
  )
}

// Special component for CodePitamah highlighting
export function CodePitamahHighlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full"
    >
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span className="text-sm font-medium text-green-400">
          Fully Functional AI Code Analysis
      </span>
    </motion.div>
  )
}

// Component for feature status banners
export function FeatureStatusBanner({ 
  status, 
  message, 
  className = '' 
}: { 
  status: 'live' | 'demo' | 'coming-soon' | 'beta'
  message: string
  className?: string
}) {
  const getBannerConfig = () => {
    switch (status) {
      case 'live':
        return {
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          textColor: 'text-green-300',
          icon: CheckCircle
        }
      case 'demo':
        return {
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/20',
          textColor: 'text-yellow-300',
          icon: AlertTriangle
        }
      case 'coming-soon':
        return {
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/20',
          textColor: 'text-blue-300',
          icon: Clock
        }
      case 'beta':
        return {
          bgColor: 'bg-purple-500/10',
          borderColor: 'border-purple-500/20',
          textColor: 'text-purple-300',
          icon: Zap
        }
    }
  }

  const config = getBannerConfig()
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex items-center space-x-3 p-4 rounded-lg border
        ${config.bgColor} ${config.borderColor} ${className}
      `}
    >
      <Icon size={20} className={config.textColor} />
      <p className={`text-sm ${config.textColor}`}>
        {message}
      </p>
    </motion.div>
  )
}
