import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Upload, Bot, Timeline, Play, Sparkles, Layers } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: 'SVG Feltöltés & Animáció',
      description: 'Töltsd fel a saját SVG fájlodat és válassz egyszerű animáció típusokat',
      link: '/upload',
      color: 'bg-blue-500'
    },
    {
      icon: Bot,
      title: 'AI Alapú Animáció',
      description: 'Hozz létre vektoros SVG animációkat párbeszéd alapú prompt segítségével',
      link: '/ai-animation',
      color: 'bg-purple-500'
    },
    {
      icon: Timeline,
      title: 'Timeline Editor',
      description: 'Készíts összetett animációkat frame-by-frame timeline szerkesztővel',
      link: '/timeline',
      color: 'bg-green-500'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="inline-block mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles size={40} className="text-white" />
          </div>
        </motion.div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          SVG Animáció Készítő
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Modern webes eszköz SVG animációk készítésére. Töltsd fel saját SVG-ket, 
          használj AI-t kreatív animációkhoz, vagy építs összetett animációkat timeline szerkesztővel.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link to="/upload" className="btn-primary text-lg px-8 py-3">
            <Play size={20} className="inline mr-2" />
            Kezdés
          </Link>
          <Link to="/ai-animation" className="btn-secondary text-lg px-8 py-3">
            <Bot size={20} className="inline mr-2" />
            AI Próba
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-3 gap-8 py-16"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>
              
              <Link 
                to={feature.link}
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                Kipróbálás
                <motion.span
                  whileHover={{ x: 5 }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-white text-center"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold mb-2">3</div>
            <div className="text-primary-100">Animáció Típus</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">∞</div>
            <div className="text-primary-100">Kreatív Lehetőség</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">
              <Layers size={32} className="inline" />
            </div>
            <div className="text-primary-100">Professzionális Minőség</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home 