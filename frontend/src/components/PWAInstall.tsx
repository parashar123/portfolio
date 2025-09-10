import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Wifi, WifiOff } from 'lucide-react'
import { usePWA } from '../hooks/usePWA'

export default function PWAInstall() {
  const { isInstallable, isInstalled, isOnline, installApp } = usePWA()

  if (isInstalled) {
    return null
  }

  return (
    <AnimatePresence>
      {/* Install Prompt */}
      {isInstallable && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
        >
          <div className="glass-card p-4 border-primary-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Download size={20} className="text-primary-400" />
                <span className="text-dark-100 font-medium">Install App</span>
              </div>
              <button
                onClick={() => window.dispatchEvent(new Event('beforeinstallprompt'))}
                className="text-dark-400 hover:text-dark-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <p className="text-dark-300 text-sm mb-3">
              Install this app for a better experience with offline access and faster loading.
            </p>
            
            <button
              onClick={installApp}
              className="w-full btn-primary text-sm"
            >
              Install Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Offline Indicator */}
      {!isOnline && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
        >
          <div className="glass-card p-4 border-yellow-500/20 bg-yellow-500/5">
            <div className="flex items-center space-x-2">
              <WifiOff size={20} className="text-yellow-400" />
              <span className="text-dark-100 font-medium">Offline Mode</span>
            </div>
            <p className="text-dark-300 text-sm mt-1">
              You're offline. Some features may be limited.
            </p>
          </div>
        </motion.div>
      )}

      {/* Online Indicator */}
      {isOnline && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
        >
          <div className="glass-card p-4 border-green-500/20 bg-green-500/5">
            <div className="flex items-center space-x-2">
              <Wifi size={20} className="text-green-400" />
              <span className="text-dark-100 font-medium">Online</span>
            </div>
            <p className="text-dark-300 text-sm mt-1">
              All features are available.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
