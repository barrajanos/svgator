import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Play, Download, RotateCw, Zap, Heart, Sparkles, ArrowRight } from 'lucide-react'

interface AnimationType {
  id: string
  name: string
  description: string
  icon: any
  preview: string
}

const UploadAnimation = () => {
  const [uploadedSVG, setUploadedSVG] = useState<string | null>(null)
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const animationTypes: AnimationType[] = [
    {
      id: 'rotate',
      name: 'Forgatás',
      description: 'Folyamatos forgatás a középpont körül',
      icon: RotateCw,
      preview: 'rotate-animation'
    },
    {
      id: 'pulse',
      name: 'Pulzálás',
      description: 'Ritmikus méretváltozás',
      icon: Heart,
      preview: 'pulse-animation'
    },
    {
      id: 'bounce',
      name: 'Pattogás',
      description: 'Rugalmas fel-le mozgás',
      icon: ArrowRight,
      preview: 'bounce-animation'
    },
    {
      id: 'glow',
      name: 'Ragyogás',
      description: 'Fény effekt változó intenzitással',
      icon: Sparkles,
      preview: 'glow-animation'
    },
    {
      id: 'slide',
      name: 'Csúszás',
      description: 'Oldalirányú mozgás',
      icon: ArrowRight,
      preview: 'slide-animation'
    },
    {
      id: 'zoom',
      name: 'Nagyítás',
      description: 'Be- és kizoomolás',
      icon: Zap,
      preview: 'zoom-animation'
    }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedSVG(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedSVG(e.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const applyAnimation = () => {
    if (!selectedAnimation || !uploadedSVG) return
    setIsAnimating(true)
    // Itt történne az animáció alkalmazása
    setTimeout(() => setIsAnimating(false), 2000)
  }

  const downloadAnimatedSVG = () => {
    if (!uploadedSVG || !selectedAnimation) return
    // Itt történne az animált SVG letöltése
    const element = document.createElement('a')
    const file = new Blob([uploadedSVG], { type: 'image/svg+xml' })
    element.href = URL.createObjectURL(file)
    element.download = `animated-${selectedAnimation.id}.svg`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SVG Feltöltés & Animáció
          </h1>
          <p className="text-xl text-gray-600">
            Töltsd fel a saját SVG fájlodat és válassz animáció típust
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                SVG Feltöltés
              </h2>
              
              {!uploadedSVG ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-primary-500 transition-colors duration-200"
                >
                  <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    Húzd ide az SVG fájlt vagy kattints a tallózáshoz
                  </p>
                  <p className="text-sm text-gray-500">
                    Csak SVG fájlok támogatottak
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div 
                      dangerouslySetInnerHTML={{ __html: uploadedSVG }}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setUploadedSVG(null)
                      setSelectedAnimation(null)
                    }}
                    className="btn-secondary w-full"
                  >
                    Új SVG feltöltése
                  </button>
                </div>
              )}
            </div>

            {uploadedSVG && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Animáció Vezérlés
                </h3>
                
                <div className="space-y-4">
                  <button
                    onClick={applyAnimation}
                    disabled={!selectedAnimation || isAnimating}
                    className={`btn-primary w-full flex items-center justify-center ${
                      (!selectedAnimation || isAnimating) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Play size={20} className="mr-2" />
                    {isAnimating ? 'Animáció alkalmazása...' : 'Animáció alkalmazása'}
                  </button>
                  
                  <button
                    onClick={downloadAnimatedSVG}
                    disabled={!selectedAnimation}
                    className={`btn-secondary w-full flex items-center justify-center ${
                      !selectedAnimation ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Download size={20} className="mr-2" />
                    Animált SVG letöltése
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Animation Types */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Animáció Típusok
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {animationTypes.map((animation) => {
                  const Icon = animation.icon
                  const isSelected = selectedAnimation?.id === animation.id
                  
                  return (
                    <motion.button
                      key={animation.id}
                      onClick={() => setSelectedAnimation(animation)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <Icon 
                          size={20} 
                          className={isSelected ? 'text-primary-600' : 'text-gray-600'} 
                        />
                        <span className={`ml-2 font-medium ${
                          isSelected ? 'text-primary-900' : 'text-gray-900'
                        }`}>
                          {animation.name}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        isSelected ? 'text-primary-700' : 'text-gray-600'
                      }`}>
                        {animation.description}
                      </p>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {selectedAnimation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200"
              >
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Kiválasztva: {selectedAnimation.name}
                </h3>
                <p className="text-primary-700 mb-4">
                  {selectedAnimation.description}
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Animáció előnézet:</p>
                  <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                    <motion.div
                      animate={
                        selectedAnimation.id === 'rotate' ? { rotate: 360 } :
                        selectedAnimation.id === 'pulse' ? { scale: [1, 1.2, 1] } :
                        selectedAnimation.id === 'bounce' ? { y: [0, -10, 0] } :
                        {}
                      }
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-8 h-8 bg-primary-500 rounded"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UploadAnimation 