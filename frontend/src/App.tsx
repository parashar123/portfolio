import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PWAInstall from './components/PWAInstall'
import Home from './pages/Home'
import MLOpsStudio from './pages/MLOpsStudio'
import ArchitectureViz from './pages/ArchitectureViz'
import CodePitamah from './pages/CodePitamah'
import CostOptimizer from './pages/CostOptimizer'
import ConsultingHub from './pages/ConsultingHub'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark-900">
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/mlops-studio" element={<MLOpsStudio />} />
            <Route path="/architecture-viz" element={<ArchitectureViz />} />
            <Route path="/codepitamah" element={<CodePitamah />} />
            <Route path="/cost-optimizer" element={<CostOptimizer />} />
            <Route path="/consulting-hub" element={<ConsultingHub />} />
          </Routes>
        </AnimatePresence>
        <PWAInstall />
      </Layout>
    </div>
  )
}

export default App
