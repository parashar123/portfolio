import { motion } from 'framer-motion'
import { MessageCircle, Mail } from 'lucide-react'
import { openWhatsApp, openEmail } from '../utils/contactUtils'

interface ContactButtonsProps {
  context?: 'general' | 'mlops' | 'architecture' | 'costOptimization' | 'consulting' | 'codepitamah'
  variant?: 'default' | 'compact' | 'hero'
  className?: string
}

export default function ContactButtons({ 
  context = 'general', 
  variant = 'default',
  className = '' 
}: ContactButtonsProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          container: 'flex flex-col sm:flex-row gap-4 justify-center',
          whatsapp: 'bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2',
          email: 'bg-white text-primary-600 hover:bg-primary-50 font-medium px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2'
        }
      case 'compact':
        return {
          container: 'flex gap-3',
          whatsapp: 'bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm',
          email: 'bg-dark-700 hover:bg-dark-600 text-dark-100 font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm border border-dark-600'
        }
      default:
        return {
          container: 'flex flex-col sm:flex-row gap-3',
          whatsapp: 'bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2',
          email: 'bg-dark-700 hover:bg-dark-600 text-dark-100 font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-dark-600'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${styles.container} ${className}`}
    >
      <motion.button
        onClick={() => openWhatsApp(context)}
        className={styles.whatsapp}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(37, 211, 102, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 4px 15px rgba(37, 211, 102, 0.2)",
            "0 8px 25px rgba(37, 211, 102, 0.4)",
            "0 4px 15px rgba(37, 211, 102, 0.2)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
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
          <MessageCircle size={variant === 'compact' ? 16 : 20} />
        </motion.div>
        {variant === 'compact' ? 'WhatsApp' : 'Chat on WhatsApp'}
      </motion.button>
      
      <motion.button
        onClick={() => openEmail(context)}
        className={styles.email}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0, 123, 255, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 4px 15px rgba(0, 123, 255, 0.1)",
            "0 8px 25px rgba(0, 123, 255, 0.2)",
            "0 4px 15px rgba(0, 123, 255, 0.1)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Mail size={variant === 'compact' ? 16 : 20} />
        </motion.div>
        {variant === 'compact' ? 'Email' : 'Send Email'}
      </motion.button>
    </motion.div>
  )
}
