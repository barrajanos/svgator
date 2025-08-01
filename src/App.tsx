import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import UploadAnimation from './pages/UploadAnimation'
import AIAnimation from './pages/AIAnimation'
import TimelineEditor from './pages/TimelineEditor'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadAnimation />} />
          <Route path="/ai-animation" element={<AIAnimation />} />
          <Route path="/timeline" element={<TimelineEditor />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App 