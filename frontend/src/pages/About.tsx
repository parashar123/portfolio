import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { 
  Brain, 
  Code, 
  Users, 
  Target, 
  Award, 
  TrendingUp,
  Zap,
  Globe,
  Mail,
  MessageCircle
} from 'lucide-react'

// Typing animation component
const TypingAnimation = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    // Reset animation when text changes
    setDisplayText('')
    setCurrentIndex(0)
  }, [text])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block w-0.5 h-5 bg-primary-400 ml-1"
      />
    </span>
  )
}

export default function About() {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)


  const values = [
    {
      icon: Target,
      title: 'Impact-Driven',
      description: 'Every project focuses on measurable business impact and real-world value delivery'
    },
    {
      icon: Brain,
      title: 'Innovation-First',
      description: 'Leveraging cutting-edge AI/ML technologies to solve complex engineering challenges'
    },
    {
      icon: Users,
      title: 'Team-Oriented',
      description: 'Building high-performing teams through mentorship, clear communication, and shared goals'
    },
    {
      icon: Code,
      title: 'Quality-Focused',
      description: 'Writing clean, maintainable code with comprehensive testing and documentation'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(51,65,85,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">About Me</span>
            </h1>
            
            {/* Professional Photo and Typing Animation Section */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 mb-6 lg:mb-8">
              {/* Professional Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative mb-4 lg:mb-0"
              >
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-primary-500/30 shadow-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                    {!imageLoaded && !imageError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-800/90 text-primary-400 rounded-full">
                        <div className="w-6 h-6 border-2 border-primary-400 border-t-transparent rounded-full animate-spin mb-1"></div>
                        <span className="text-xs text-center px-2">Loading...</span>
                      </div>
                    )}
                    {imageError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-800/90 text-primary-400 rounded-full">
                        <Users size={24} className="mb-1" />
                        <span className="text-xs text-center px-2">Photo</span>
                      </div>
                    )}
                    <img
                      src="/suraj-professional-photo.jpg"
                      alt="Suraj Kumar - Professional Photo"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onLoad={() => {
                        console.log('About Photo loaded successfully!')
                        setImageLoaded(true)
                        setImageError(false)
                      }}
                      onError={() => {
                        console.log('About Photo failed to load')
                        
                        setImageError(true)
                      }}
                      loading="eager"
                    />
                  </div>
                  {/* Animated ring around photo - temporarily disabled for debugging */}
                  {/* <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    style={{
                      background: 'conic-gradient(from 0deg, #3b82f6, #10b981, #3b82f6)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor'
                    }}
                  /> */}
                </div>
              </motion.div>

              {/* Typing Animation */}
              <div className="flex-1 w-full max-w-lg lg:max-w-2xl px-4 lg:px-0">
                <div className="relative">
                  <p className="text-lg sm:text-xl lg:text-2xl text-dark-300 leading-relaxed min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center text-center">
                    <TypingAnimation 
                      text="Building intelligent systems that blend ML/AI with robust product engineering"
                      speed={60}
                    />
                  </p>
                  {/* Subtle background glow effect */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 rounded-lg blur-sm -z-10"
                  />
                </div>
              </div>
            </div>

            {/* Work in Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="flex items-center justify-center gap-2 text-sm text-primary-400"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full"
              />
              <span>Always evolving, always learning</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 lg:py-20 bg-dark-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-6"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-dark-100 mb-4 lg:mb-6">My Journey</h2>
              <div className="space-y-3 lg:space-y-4 leading-relaxed text-dark-300 text-sm lg:text-base">
                <p>
                  With over 9 years of experience as a full-stack developer and technical leader, I specialize in building 
                  large-scale distributed systems and managing complex programs. My expertise spans microservices architecture, 
                  system design, and cloud systems.
                </p>
                <p>
                  I've successfully led teams of 15+ developers, delivering projects that drive measurable business impact. 
                  My approach combines technical excellence with strong leadership, focusing on mentorship, continuous learning, 
                  and setting clear OKRs that help teams thrive.
        </p>
        <p>
                  Beyond professional achievements, I'm passionate about sharing knowledge with the tech community. I create 
                  content that simplifies complex technical concepts and provides insights from real-world experience.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-6"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-dark-100 mb-4 lg:mb-6">Core Values</h3>
              <div className="space-y-3 lg:space-y-4">
                {values.map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-dark-800/50 rounded-lg border border-dark-700/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-base lg:text-lg font-semibold text-dark-100 mb-1 lg:mb-2">{value.title}</h4>
                      <p className="text-dark-300 text-sm lg:text-base">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-8">
              Learning Philosophy
            </h2>
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
              <div className="flex items-center justify-center mb-6">
                <Zap size={32} className="text-yellow-300 mr-3" />
                <h3 className="text-2xl font-bold">"30 Minutes Daily Learning"</h3>
              </div>
              <p className="text-lg leading-relaxed text-primary-100 mb-6">
                Just 30 minutes, from today, for the next 14 days, follow what you want to learn, and see the difference. 
                This really works, and drastically changed my life.
              </p>
              <p className="text-primary-200">
                Try it in the morning, the very first thing, before starting your office work. Because after wrapping office work, 
                if you're planning, let me tell you something, that's gonna be a nightmare and won't happen in the long run.
        </p>
      </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dark-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-8">
              Let's Connect
            </h2>
            <p className="text-xl text-dark-300 mb-8">
              I enjoy learning new things and connecting with people across a range of industries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://t.me/practicalGuru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <MessageCircle size={20} />
                <span>Telegram Channel</span>
              </a>
              <a
                href="mailto:pitamah.techinsights@gmail.com"
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
              >
                <Mail size={20} />
                <span>Email Me</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


