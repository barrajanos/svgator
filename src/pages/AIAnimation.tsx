import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, Download, Sparkles, RefreshCw, Copy } from 'lucide-react'

interface GeneratedAnimation {
  id: string
  prompt: string
  svgCode: string
  timestamp: Date
  style: string
}

const AIAnimation = () => {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAnimations, setGeneratedAnimations] = useState<GeneratedAnimation[]>([])
  const [selectedAnimation, setSelectedAnimation] = useState<GeneratedAnimation | null>(null)

  const promptSuggestions = [
    "Egy pillangó, ami virágról virágra repül színes nyomvonallal",
    "Geometrikus alakzatok, amik pulzálnak és színt váltanak",
    "Egy fa levelei, amik szélben lengedeznek",
    "Csillagok, amik felragyognak az éjszakai égbolton",
    "Hullámzó víz effekt kék árnyalatokkal",
    "Forgó mandala mintázat gradiens színekkel"
  ]

  const animationStyles = [
    { id: 'smooth', name: 'Sima', description: 'Folyamatos, lágy animáció' },
    { id: 'bouncy', name: 'Rugalmas', description: 'Pattogó, élénk mozgás' },
    { id: 'elegant', name: 'Elegáns', description: 'Kifinomult, lassú animáció' },
    { id: 'energetic', name: 'Energikus', description: 'Gyors, dinamikus mozgás' }
  ]

  const [selectedStyle, setSelectedStyle] = useState(animationStyles[0])

  const generateAnimation = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    // Szimulálja az AI generálást
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const newAnimation: GeneratedAnimation = {
      id: Date.now().toString(),
      prompt: prompt,
      svgCode: generateMockSVG(prompt, selectedStyle.id),
      timestamp: new Date(),
      style: selectedStyle.name
    }
    
    setGeneratedAnimations(prev => [newAnimation, ...prev])
    setSelectedAnimation(newAnimation)
    setIsGenerating(false)
    setPrompt('')
  }

  const generateMockSVG = (prompt: string, style: string): string => {
    // Mock SVG generálás a prompt alapján
    const colors = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    
    return `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${randomColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${randomColor}80;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="150" cy="150" r="80" fill="url(#grad)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 150 150;360 150 150"
            dur="${style === 'energetic' ? '1s' : style === 'elegant' ? '4s' : '2s'}"
            repeatCount="indefinite"/>
          <animate
            attributeName="r"
            values="80;120;80"
            dur="3s"
            repeatCount="indefinite"/>
        </circle>
        <text x="150" y="250" text-anchor="middle" fill="#666" font-size="12">
          AI Generált: ${prompt.substring(0, 20)}...
        </text>
      </svg>
    `
  }

  const downloadSVG = (animation: GeneratedAnimation) => {
    const element = document.createElement('a')
    const file = new Blob([animation.svgCode], { type: 'image/svg+xml' })
    element.href = URL.createObjectURL(file)
    element.download = `ai-animation-${animation.id}.svg`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
            AI Animáció Generátor
          </h1>
          <p className="text-xl text-gray-600">
            Hozz létre egyedi SVG animációkat mesterséges intelligencia segítségével
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Bot size={24} className="mr-2 text-primary-600" />
                Animáció Leírása
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Írd le, milyen animációt szeretnél:
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Pl: Egy színes pillangó, ami körbe repül virágok között..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Animáció stílusa:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {animationStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        className={`p-2 text-sm rounded-lg border transition-colors ${
                          selectedStyle.id === style.id
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedStyle.description}
                  </p>
                </div>

                <button
                  onClick={generateAnimation}
                  disabled={!prompt.trim() || isGenerating}
                  className={`btn-primary w-full flex items-center justify-center ${
                    (!prompt.trim() || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={20} className="mr-2 animate-spin" />
                      Generálás...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Animáció Generálása
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Prompt ötletek
              </h3>
              <div className="space-y-2">
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <Sparkles size={14} className="inline mr-2 text-yellow-500" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            {selectedAnimation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Generált Animáció
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadSVG(selectedAnimation)}
                      className="btn-secondary flex items-center"
                    >
                      <Download size={16} className="mr-1" />
                      Letöltés
                    </button>
                    <button
                      onClick={() => copyToClipboard(selectedAnimation.svgCode)}
                      className="btn-secondary flex items-center"
                    >
                      <Copy size={16} className="mr-1" />
                      Kód másolása
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 text-center mb-4">
                  <div dangerouslySetInnerHTML={{ __html: selectedAnimation.svgCode }} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Prompt:</strong> {selectedAnimation.prompt}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Stílus:</strong> {selectedAnimation.style}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Generálva:</strong> {selectedAnimation.timestamp.toLocaleString('hu-HU')}
                  </p>
                </div>
              </motion.div>
            )}

            {generatedAnimations.length > 0 && (
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Előzmények
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {generatedAnimations.map((animation) => (
                    <motion.div
                      key={animation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedAnimation?.id === animation.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAnimation(animation)}
                    >
                      <div className="bg-white rounded p-2 mb-2">
                        <div 
                          dangerouslySetInnerHTML={{ __html: animation.svgCode }}
                          className="w-full h-24 flex items-center justify-center"
                          style={{ transform: 'scale(0.3)' }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {animation.prompt}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {animation.timestamp.toLocaleDateString('hu-HU')}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card text-center"
              >
                <div className="py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    AI dolgozik...
                  </h3>
                  <p className="text-gray-600">
                    Egyedi SVG animáció generálása a prompt alapján
                  </p>
                </div>
              </motion.div>
            )}

            {!selectedAnimation && !isGenerating && generatedAnimations.length === 0 && (
              <div className="card text-center py-12">
                <Bot size={64} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Még nincs generált animáció
                </h3>
                <p className="text-gray-600">
                  Add meg a leírásodat és nyomd meg a "Generálás" gombot
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AIAnimation 