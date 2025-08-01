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
    "Hullámzó víz effekt kék árnyalatokkal buborékokkal",
    "Forgó mandala mintázat gradiens színekkel",
    "Táncoló geometrikus alakzatok különböző színekben",
    "Hulló levelek egy szeles őszi napon"
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
    const promptLower = prompt.toLowerCase()
    const colors = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B', '#EC4899', '#06B6D4']
    
    // Animáció sebesség stílus szerint
    const getDuration = (base: string) => {
      switch(style) {
        case 'energetic': return `${parseFloat(base) * 0.5}s`
        case 'elegant': return `${parseFloat(base) * 2}s`
        case 'bouncy': return `${parseFloat(base) * 0.8}s`
        default: return base
      }
    }
    
    // Prompt alapú SVG generálás
    if (promptLower.includes('pillangó') || promptLower.includes('butterfly')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wing1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#EC4899;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.6" />
            </linearGradient>
          </defs>
          <!-- Pillangó test -->
          <line x1="150" y1="120" x2="150" y2="180" stroke="#4B5563" stroke-width="3"/>
          <!-- Szárnyak -->
          <ellipse cx="130" cy="140" rx="25" ry="15" fill="url(#wing1)">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 130 140;10 130 140;-10 130 140;0 130 140" 
              dur="${getDuration('1.5s')}" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="170" cy="140" rx="25" ry="15" fill="url(#wing1)">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 170 140;-10 170 140;10 170 140;0 170 140" 
              dur="${getDuration('1.5s')}" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="135" cy="160" rx="15" ry="10" fill="url(#wing1)">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 135 160;8 135 160;-8 135 160;0 135 160" 
              dur="${getDuration('1.5s')}" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="165" cy="160" rx="15" ry="10" fill="url(#wing1)">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 165 160;-8 165 160;8 165 160;0 165 160" 
              dur="${getDuration('1.5s')}" repeatCount="indefinite"/>
          </ellipse>
          <!-- Repülő nyom -->
          <path d="M 80 200 Q 150 180 220 210 Q 150 220 80 200" fill="none" stroke="#EC4899" stroke-width="2" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="${getDuration('2s')}" repeatCount="indefinite"/>
          </path>
        </svg>
      `
    }
    
    if (promptLower.includes('csillag') || promptLower.includes('star')) {
      const starColors = colors.slice(0, 3)
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#FBBF24;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#F59E0B;stop-opacity:0.3" />
            </radialGradient>
          </defs>
          <!-- Nagy csillag -->
          <path d="M 150 60 L 160 100 L 200 100 L 170 125 L 180 165 L 150 140 L 120 165 L 130 125 L 100 100 L 140 100 Z" fill="url(#starGlow)">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${getDuration('2s')}" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" 
              values="0 150 125;360 150 125" dur="${getDuration('8s')}" repeatCount="indefinite"/>
          </path>
          <!-- Kis csillagok -->
          <circle cx="100" cy="80" r="3" fill="#FBBF24">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="${getDuration('1.5s')}" repeatCount="indefinite"/>
          </circle>
          <circle cx="200" cy="90" r="2" fill="#F59E0B">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="${getDuration('2.2s')}" repeatCount="indefinite"/>
          </circle>
          <circle cx="80" cy="180" r="4" fill="#FBBF24">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="${getDuration('1.8s')}" repeatCount="indefinite"/>
          </circle>
          <circle cx="220" cy="200" r="3" fill="#F59E0B">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${getDuration('2.5s')}" repeatCount="indefinite"/>
          </circle>
        </svg>
      `
    }
    
    if (promptLower.includes('víz') || promptLower.includes('hullám') || promptLower.includes('water')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#06B6D4;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#0891B2;stop-opacity:1" />
            </linearGradient>
          </defs>
          <!-- Hullámok -->
          <path d="M 0 150 Q 75 130 150 150 T 300 150 L 300 300 L 0 300 Z" fill="url(#water)">
            <animate attributeName="d" 
              values="M 0 150 Q 75 130 150 150 T 300 150 L 300 300 L 0 300 Z;
                      M 0 160 Q 75 140 150 160 T 300 160 L 300 300 L 0 300 Z;
                      M 0 150 Q 75 130 150 150 T 300 150 L 300 300 L 0 300 Z"
              dur="${getDuration('3s')}" repeatCount="indefinite"/>
          </path>
          <path d="M 0 170 Q 50 155 100 170 T 200 170 T 300 170 L 300 300 L 0 300 Z" fill="url(#water)" opacity="0.7">
            <animate attributeName="d" 
              values="M 0 170 Q 50 155 100 170 T 200 170 T 300 170 L 300 300 L 0 300 Z;
                      M 0 175 Q 50 160 100 175 T 200 175 T 300 175 L 300 300 L 0 300 Z;
                      M 0 170 Q 50 155 100 170 T 200 170 T 300 170 L 300 300 L 0 300 Z"
              dur="${getDuration('2.5s')}" repeatCount="indefinite"/>
          </path>
          <!-- Buborékok -->
          <circle cx="80" cy="200" r="4" fill="#67E8F9" opacity="0.6">
            <animate attributeName="cy" values="220;80;220" dur="${getDuration('4s')}" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="${getDuration('4s')}" repeatCount="indefinite"/>
          </circle>
          <circle cx="150" cy="230" r="6" fill="#22D3EE" opacity="0.5">
            <animate attributeName="cy" values="250;100;250" dur="${getDuration('5s')}" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="${getDuration('5s')}" repeatCount="indefinite"/>
          </circle>
        </svg>
      `
    }
    
    if (promptLower.includes('fa') || promptLower.includes('level') || promptLower.includes('tree')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="trunk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#92400E;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#78350F;stop-opacity:1" />
            </linearGradient>
          </defs>
          <!-- Fatörzs -->
          <rect x="140" y="200" width="20" height="80" fill="url(#trunk)"/>
          <!-- Lombozat -->
          <circle cx="150" cy="180" r="50" fill="#22C55E" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 150 180;2 150 180;-2 150 180;0 150 180" 
              dur="${getDuration('3s')}" repeatCount="indefinite"/>
          </circle>
          <circle cx="130" cy="160" r="35" fill="#16A34A" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 130 160;-1.5 130 160;1.5 130 160;0 130 160" 
              dur="${getDuration('2.8s')}" repeatCount="indefinite"/>
          </circle>
          <circle cx="170" cy="160" r="35" fill="#15803D" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 170 160;1.8 170 160;-1.8 170 160;0 170 160" 
              dur="${getDuration('3.2s')}" repeatCount="indefinite"/>
          </circle>
          <!-- Hulló levelek -->
          <ellipse cx="100" cy="100" rx="3" ry="6" fill="#22C55E">
            <animate attributeName="cy" values="100;250;100" dur="${getDuration('6s')}" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" 
              values="0 100 100;180 100 150;360 100 200" dur="${getDuration('6s')}" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="200" cy="120" rx="3" ry="6" fill="#16A34A">
            <animate attributeName="cy" values="120;260;120" dur="${getDuration('7s')}" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" 
              values="0 200 120;-180 200 170;-360 200 220" dur="${getDuration('7s')}" repeatCount="indefinite"/>
          </ellipse>
        </svg>
      `
    }
    
    if (promptLower.includes('geometrikus') || promptLower.includes('alakzat') || promptLower.includes('geometric')) {
      const shapeColors = colors.slice(0, 4)
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Háromszög -->
          <polygon points="150,80 120,140 180,140" fill="${shapeColors[0]}" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 150 110;120 150 110;240 150 110;360 150 110" 
              dur="${getDuration('4s')}" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;1;0.8" dur="${getDuration('2s')}" repeatCount="indefinite"/>
          </polygon>
          <!-- Négyzet -->
          <rect x="110" y="160" width="40" height="40" fill="${shapeColors[1]}" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 130 180;90 130 180;180 130 180;270 130 180;360 130 180" 
              dur="${getDuration('3s')}" repeatCount="indefinite"/>
            <animate attributeName="fill" values="${shapeColors[1]};${shapeColors[2]};${shapeColors[1]}" dur="${getDuration('2.5s')}" repeatCount="indefinite"/>
          </rect>
          <!-- Kör -->
          <circle cx="200" cy="180" r="25" fill="${shapeColors[2]}" opacity="0.9">
            <animate attributeName="r" values="25;35;25" dur="${getDuration('2s')}" repeatCount="indefinite"/>
            <animate attributeName="fill" values="${shapeColors[2]};${shapeColors[3]};${shapeColors[2]}" dur="${getDuration('3s')}" repeatCount="indefinite"/>
          </circle>
          <!-- Hatszög -->
          <polygon points="150,220 135,235 135,255 150,270 165,255 165,235" fill="${shapeColors[3]}" opacity="0.8">
            <animateTransform attributeName="transform" type="scale" 
              values="1 150 245;1.2 150 245;1 150 245" 
              dur="${getDuration('2.2s')}" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="${getDuration('1.8s')}" repeatCount="indefinite"/>
          </polygon>
        </svg>
      `
    }
    
    if (promptLower.includes('mandala') || promptLower.includes('minta') || promptLower.includes('pattern')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="mandala" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#EC4899;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.6" />
            </radialGradient>
          </defs>
          <g transform="translate(150,150)">
            <!-- Belső kör -->
            <circle cx="0" cy="0" r="20" fill="url(#mandala)">
              <animate attributeName="r" values="20;25;20" dur="${getDuration('3s')}" repeatCount="indefinite"/>
            </circle>
            <!-- Körív minták -->
            ${Array.from({length: 8}, (_, i) => {
              const angle = i * 45
              return `
                <g transform="rotate(${angle})">
                  <ellipse cx="0" cy="-40" rx="8" ry="20" fill="url(#mandala)" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="${getDuration('2s')}" begin="${i * 0.25}s" repeatCount="indefinite"/>
                  </ellipse>
                  <circle cx="0" cy="-60" r="5" fill="url(#mandala)">
                    <animate attributeName="r" values="5;8;5" dur="${getDuration('1.5s')}" begin="${i * 0.2}s" repeatCount="indefinite"/>
                  </circle>
                </g>
              `
            }).join('')}
            <!-- Forgó külső gyűrű -->
            <animateTransform attributeName="transform" type="rotate" 
              values="0 150 150;360 150 150" dur="${getDuration('8s')}" repeatCount="indefinite"/>
          </g>
        </svg>
      `
    }
    
    // Default: változatos kör animáció
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    return `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${randomColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${randomColor}80;stop-opacity:0.4" />
          </radialGradient>
        </defs>
        <circle cx="150" cy="150" r="60" fill="url(#grad)">
          <animate attributeName="r" values="60;90;60" dur="${getDuration('2.5s')}" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.6;1" dur="${getDuration('1.8s')}" repeatCount="indefinite"/>
        </circle>
        <!-- Körülötte keringő elemek -->
        <circle cx="220" cy="150" r="8" fill="${randomColor}">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 150 150;360 150 150" dur="${getDuration('4s')}" repeatCount="indefinite"/>
        </circle>
        <circle cx="80" cy="150" r="6" fill="${randomColor}">
          <animateTransform attributeName="transform" type="rotate" 
            values="180 150 150;540 150 150" dur="${getDuration('4s')}" repeatCount="indefinite"/>
        </circle>
        <text x="150" y="250" text-anchor="middle" fill="#666" font-size="10">
          "${prompt.substring(0, 30)}..."
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