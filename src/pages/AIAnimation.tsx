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
    "Egy lakat ami kirajzolódik és bezáródik",
    "Ház építése vonalanként felépülve",
    "Szív ikon ami lüktet és kirajzolódik", 
    "Villám csapás animáció vonalas stílusban",
    "Nap ikon sugarakkal kirajzolódva",
    "Autó ikon ami mozog és kirajzolódik",
    "Fa növekedése ágról ágra",
    "Laptop képernyő megnyitása vonalas animációval"
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
    const strokeColors = ['#2563EB', '#7C3AED', '#DC2626', '#059669', '#D97706', '#DB2777', '#0891B2']
    const primaryColor = strokeColors[Math.floor(Math.random() * strokeColors.length)]
    
    // Animáció sebesség stílus szerint
    const getDuration = (base: string) => {
      switch(style) {
        case 'energetic': return `${parseFloat(base) * 0.6}s`
        case 'elegant': return `${parseFloat(base) * 1.8}s`
        case 'bouncy': return `${parseFloat(base) * 0.9}s`
        default: return base
      }
    }
    
    // Közös SVG stílusok vonalas animációkhoz
    const commonStyles = `
      stroke-width="2.5" 
      fill="none" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    `
    
    // Prompt alapú vonalas ikon animációk
    if (promptLower.includes('lakat') || promptLower.includes('lock')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Lakat test -->
          <rect x="120" y="160" width="60" height="50" rx="8" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="200" stroke-dashoffset="200">
            <animate attributeName="stroke-dashoffset" 
                     values="200;0" dur="${getDuration('2s')}" 
                     begin="1s" fill="freeze"/>
          </rect>
          
          <!-- Lakat íve -->
          <path d="M 130 160 L 130 140 Q 130 120 150 120 Q 170 120 170 140 L 170 160" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="100" stroke-dashoffset="100">
            <animate attributeName="stroke-dashoffset" 
                     values="100;0" dur="${getDuration('1.5s')}" 
                     begin="0s" fill="freeze"/>
          </path>
          
          <!-- Kulcslyuk -->
          <circle cx="150" cy="180" r="6" 
                  stroke="${primaryColor}" stroke-width="2" fill="none"
                  opacity="0">
            <animate attributeName="opacity" 
                     values="0;1" dur="0.3s" 
                     begin="3s" fill="freeze"/>
          </circle>
          <line x1="150" y1="186" x2="150" y2="195" 
                stroke="${primaryColor}" stroke-width="2"
                stroke-dasharray="10" stroke-dashoffset="10">
            <animate attributeName="stroke-dashoffset" 
                     values="10;0" dur="0.5s" 
                     begin="3.2s" fill="freeze"/>
          </line>
          
          <!-- Záró animáció -->
          <path d="M 130 150 Q 150 130 170 150" 
                stroke="${primaryColor}" stroke-width="3"
                stroke-dasharray="50" stroke-dashoffset="50" opacity="0">
            <animate attributeName="stroke-dashoffset" 
                     values="50;0" dur="${getDuration('0.8s')}" 
                     begin="4s" fill="freeze"/>
            <animate attributeName="opacity" 
                     values="0;1;0" dur="${getDuration('1s')}" 
                     begin="4s"/>
          </path>
        </svg>
      `
    }
    
    if (promptLower.includes('ház') || promptLower.includes('house') || promptLower.includes('épület')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Alap -->
          <line x1="100" y1="220" x2="200" y2="220" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="100" stroke-dashoffset="100">
            <animate attributeName="stroke-dashoffset" 
                     values="100;0" dur="${getDuration('1s')}" 
                     begin="0s" fill="freeze"/>
          </line>
          
          <!-- Oldalfalak -->
          <line x1="100" y1="220" x2="100" y2="160" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="60" stroke-dashoffset="60">
            <animate attributeName="stroke-dashoffset" 
                     values="60;0" dur="${getDuration('0.8s')}" 
                     begin="1s" fill="freeze"/>
          </line>
          <line x1="200" y1="220" x2="200" y2="160" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="60" stroke-dashoffset="60">
            <animate attributeName="stroke-dashoffset" 
                     values="60;0" dur="${getDuration('0.8s')}" 
                     begin="1.2s" fill="freeze"/>
          </line>
          
          <!-- Tetőgerinc -->
          <line x1="100" y1="160" x2="200" y2="160" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="100" stroke-dashoffset="100">
            <animate attributeName="stroke-dashoffset" 
                     values="100;0" dur="${getDuration('0.8s')}" 
                     begin="1.8s" fill="freeze"/>
          </line>
          
          <!-- Tető -->
          <path d="M 100 160 L 150 120 L 200 160" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="120" stroke-dashoffset="120">
            <animate attributeName="stroke-dashoffset" 
                     values="120;0" dur="${getDuration('1.2s')}" 
                     begin="2.5s" fill="freeze"/>
          </path>
          
          <!-- Ajtó -->
          <rect x="130" y="190" width="20" height="30" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="100" stroke-dashoffset="100">
            <animate attributeName="stroke-dashoffset" 
                     values="100;0" dur="${getDuration('0.8s')}" 
                     begin="3.5s" fill="freeze"/>
          </rect>
          
          <!-- Ablak -->
          <rect x="165" y="175" width="20" height="20" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="80" stroke-dashoffset="80">
            <animate attributeName="stroke-dashoffset" 
                     values="80;0" dur="${getDuration('0.6s')}" 
                     begin="4s" fill="freeze"/>
          </rect>
          
          <!-- Ablakkereszt -->
          <line x1="175" y1="175" x2="175" y2="195" 
                stroke="${primaryColor}" stroke-width="1.5"
                stroke-dasharray="20" stroke-dashoffset="20">
            <animate attributeName="stroke-dashoffset" 
                     values="20;0" dur="${getDuration('0.3s')}" 
                     begin="4.5s" fill="freeze"/>
          </line>
          <line x1="165" y1="185" x2="185" y2="185" 
                stroke="${primaryColor}" stroke-width="1.5"
                stroke-dasharray="20" stroke-dashoffset="20">
            <animate attributeName="stroke-dashoffset" 
                     values="20;0" dur="${getDuration('0.3s')}" 
                     begin="4.7s" fill="freeze"/>
          </line>
        </svg>
      `
    }
    
    if (promptLower.includes('szív') || promptLower.includes('heart') || promptLower.includes('lüktet')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Szív -->
          <path d="M 150 200 C 120 180, 90 150, 90 120 C 90 100, 110 80, 130 80 C 140 80, 150 90, 150 100 C 150 90, 160 80, 170 80 C 190 80, 210 100, 210 120 C 210 150, 180 180, 150 200 Z" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="300" stroke-dashoffset="300">
            <animate attributeName="stroke-dashoffset" 
                     values="300;0" dur="${getDuration('3s')}" 
                     begin="0s" fill="freeze"/>
            <animateTransform attributeName="transform" type="scale" 
                              values="1;1.1;1" dur="${getDuration('1s')}" 
                              begin="3.5s" repeatCount="indefinite"/>
          </path>
          
          <!-- Lüktetés effekt -->
          <circle cx="150" cy="140" r="40" 
                  stroke="${primaryColor}" stroke-width="1" fill="none" opacity="0">
            <animate attributeName="r" values="30;60;30" dur="${getDuration('1s')}" 
                     begin="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0;0.8" dur="${getDuration('1s')}" 
                     begin="4s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Szívcsapás vonal -->
          <path d="M 80 250 L 110 250 L 120 230 L 140 270 L 160 210 L 180 250 L 220 250" 
                stroke="${primaryColor}" stroke-width="2.5" fill="none"
                stroke-dasharray="180" stroke-dashoffset="180">
            <animate attributeName="stroke-dashoffset" 
                     values="180;0" dur="${getDuration('2s')}" 
                     begin="5s" fill="freeze"/>
          </path>
        </svg>
      `
    }
    
    if (promptLower.includes('villám') || promptLower.includes('lightning') || promptLower.includes('csapás')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Villám -->
          <path d="M 150 60 L 140 120 L 160 120 L 120 180 L 140 180 L 110 240" 
                stroke="#EAB308" stroke-width="4" fill="none"
                stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="200" stroke-dashoffset="200">
            <animate attributeName="stroke-dashoffset" 
                     values="200;0" dur="${getDuration('1.5s')}" 
                     begin="0s" fill="freeze"/>
            <animate attributeName="stroke-width" 
                     values="4;8;4" dur="0.2s" 
                     begin="1.5s"/>
            <animate attributeName="opacity" 
                     values="1;0.3;1" dur="0.1s" 
                     begin="1.7s" repeatCount="3"/>
          </path>
          
          <!-- Villám ragyogás -->
          <circle cx="150" cy="150" r="0" 
                  stroke="#FEF3C7" stroke-width="20" fill="none" opacity="0">
            <animate attributeName="r" values="0;80;0" dur="0.8s" 
                     begin="1.5s"/>
            <animate attributeName="opacity" values="0;0.6;0" dur="0.8s" 
                     begin="1.5s"/>
          </circle>
          
          <!-- Kisebb villámok -->
          <path d="M 180 100 L 170 140 L 190 160" 
                stroke="#EAB308" stroke-width="2" fill="none"
                stroke-dasharray="80" stroke-dashoffset="80">
            <animate attributeName="stroke-dashoffset" 
                     values="80;0" dur="${getDuration('0.8s')}" 
                     begin="2s" fill="freeze"/>
          </path>
          <path d="M 120 90 L 110 130 L 130 145" 
                stroke="#EAB308" stroke-width="2" fill="none"
                stroke-dasharray="70" stroke-dashoffset="70">
            <animate attributeName="stroke-dashoffset" 
                     values="70;0" dur="${getDuration('0.7s')}" 
                     begin="2.2s" fill="freeze"/>
          </path>
        </svg>
      `
    }
    
    if (promptLower.includes('nap') || promptLower.includes('sun') || promptLower.includes('sugár')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Nap körvonala -->
          <circle cx="150" cy="150" r="35" 
                  stroke="#EAB308" ${commonStyles}
                  stroke-dasharray="220" stroke-dashoffset="220">
            <animate attributeName="stroke-dashoffset" 
                     values="220;0" dur="${getDuration('2s')}" 
                     begin="0s" fill="freeze"/>
          </circle>
          
          <!-- Nap sugarak -->
          ${Array.from({length: 8}, (_, i) => {
            const angle = i * 45
            const x1 = 150 + Math.cos(angle * Math.PI / 180) * 50
            const y1 = 150 + Math.sin(angle * Math.PI / 180) * 50
            const x2 = 150 + Math.cos(angle * Math.PI / 180) * 70
            const y2 = 150 + Math.sin(angle * Math.PI / 180) * 70
            return `
              <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="#EAB308" stroke-width="3" stroke-linecap="round"
                    stroke-dasharray="25" stroke-dashoffset="25">
                <animate attributeName="stroke-dashoffset" 
                         values="25;0" dur="${getDuration('0.5s')}" 
                         begin="${2 + i * 0.1}s" fill="freeze"/>
              </line>
            `
          }).join('')}
          
          <!-- Ragyogás animáció -->
          <circle cx="150" cy="150" r="35" 
                  stroke="#FEF3C7" stroke-width="2" fill="none" opacity="0">
            <animate attributeName="r" values="35;50;35" dur="${getDuration('2s')}" 
                     begin="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.8;0" dur="${getDuration('2s')}" 
                     begin="3s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Nap arca -->
          <circle cx="140" cy="140" r="3" fill="#EAB308" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.3s" 
                     begin="4s" fill="freeze"/>
          </circle>
          <circle cx="160" cy="140" r="3" fill="#EAB308" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.3s" 
                     begin="4.2s" fill="freeze"/>
          </circle>
          <path d="M 135 160 Q 150 170 165 160" 
                stroke="#EAB308" stroke-width="2" fill="none"
                stroke-dasharray="35" stroke-dashoffset="35">
            <animate attributeName="stroke-dashoffset" 
                     values="35;0" dur="0.5s" 
                     begin="4.5s" fill="freeze"/>
          </path>
        </svg>
      `
    }
    
    if (promptLower.includes('autó') || promptLower.includes('car') || promptLower.includes('jármű')) {
      return `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Autó vázolása -->
          <!-- Alváz -->
          <line x1="80" y1="180" x2="220" y2="180" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="140" stroke-dashoffset="140">
            <animate attributeName="stroke-dashoffset" 
                     values="140;0" dur="${getDuration('1.5s')}" 
                     begin="0s" fill="freeze"/>
          </line>
          
          <!-- Autó test -->
          <path d="M 80 180 L 80 160 L 100 140 L 200 140 L 220 160 L 220 180" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="240" stroke-dashoffset="240">
            <animate attributeName="stroke-dashoffset" 
                     values="240;0" dur="${getDuration('2s')}" 
                     begin="1s" fill="freeze"/>
          </path>
          
          <!-- Kerekek -->
          <circle cx="110" cy="180" r="15" 
                  stroke="${primaryColor}" ${commonStyles}
                  stroke-dasharray="95" stroke-dashoffset="95">
            <animate attributeName="stroke-dashoffset" 
                     values="95;0" dur="${getDuration('1s')}" 
                     begin="2.5s" fill="freeze"/>
            <animateTransform attributeName="transform" type="rotate" 
                              values="0 110 180;360 110 180" dur="${getDuration('2s')}" 
                              begin="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="190" cy="180" r="15" 
                  stroke="${primaryColor}" ${commonStyles}
                  stroke-dasharray="95" stroke-dashoffset="95">
            <animate attributeName="stroke-dashoffset" 
                     values="95;0" dur="${getDuration('1s')}" 
                     begin="3s" fill="freeze"/>
            <animateTransform attributeName="transform" type="rotate" 
                              values="0 190 180;360 190 180" dur="${getDuration('2s')}" 
                              begin="4s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Ablakok -->
          <path d="M 100 160 L 110 145 L 190 145 L 200 160" 
                stroke="${primaryColor}" stroke-width="2" fill="none"
                stroke-dasharray="120" stroke-dashoffset="120">
            <animate attributeName="stroke-dashoffset" 
                     values="120;0" dur="${getDuration('1.2s')}" 
                     begin="3.5s" fill="freeze"/>
          </path>
          
          <!-- Ajtó vonal -->
          <line x1="150" y1="160" x2="150" y2="145" 
                stroke="${primaryColor}" stroke-width="2"
                stroke-dasharray="15" stroke-dashoffset="15">
            <animate attributeName="stroke-dashoffset" 
                     values="15;0" dur="${getDuration('0.3s')}" 
                     begin="4.5s" fill="freeze"/>
          </line>
          
          <!-- Mozgás -->
          <animateTransform attributeName="transform" type="translate" 
                            values="0 0;30 0;0 0" dur="${getDuration('3s')}" 
                            begin="5s" repeatCount="indefinite"/>
        </svg>
      `
    }
    
    // Default: laptop megnyitása
    return `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Laptop alap -->
        <rect x="100" y="180" width="100" height="40" rx="5" 
              stroke="${primaryColor}" ${commonStyles}
              stroke-dasharray="280" stroke-dashoffset="280">
          <animate attributeName="stroke-dashoffset" 
                   values="280;0" dur="${getDuration('2s')}" 
                   begin="0s" fill="freeze"/>
        </rect>
        
        <!-- Trackpad -->
        <rect x="130" y="190" width="40" height="20" rx="3" 
              stroke="${primaryColor}" stroke-width="1.5" fill="none"
              stroke-dasharray="120" stroke-dashoffset="120">
          <animate attributeName="stroke-dashoffset" 
                   values="120;0" dur="${getDuration('1s')}" 
                   begin="2s" fill="freeze"/>
        </rect>
        
        <!-- Képernyő (zárt állapot) -->
        <rect x="105" y="175" width="90" height="5" rx="2" 
              stroke="${primaryColor}" stroke-width="2" fill="none"
              stroke-dasharray="190" stroke-dashoffset="190">
          <animate attributeName="stroke-dashoffset" 
                   values="190;0" dur="${getDuration('1.5s')}" 
                   begin="1s" fill="freeze"/>
        </rect>
        
        <!-- Képernyő nyitás -->
        <g transform-origin="150 175">
          <rect x="105" y="100" width="90" height="75" rx="5" 
                stroke="${primaryColor}" ${commonStyles}
                stroke-dasharray="330" stroke-dashoffset="330" opacity="0">
            <animate attributeName="stroke-dashoffset" 
                     values="330;0" dur="${getDuration('2.5s')}" 
                     begin="3.5s" fill="freeze"/>
            <animate attributeName="opacity" 
                     values="0;1" dur="0.1s" 
                     begin="3.5s" fill="freeze"/>
          </rect>
          
          <!-- Képernyő tartalom -->
          <rect x="115" y="110" width="70" height="50" 
                stroke="${primaryColor}" stroke-width="1.5" fill="none" opacity="0">
            <animate attributeName="opacity" 
                     values="0;1" dur="0.3s" 
                     begin="5.5s" fill="freeze"/>
          </rect>
          
          <animateTransform attributeName="transform" type="rotate" 
                            values="0;-85" dur="${getDuration('2s')}" 
                            begin="3s" fill="freeze"/>
        </g>
        
        <!-- Bekapcsolás pont -->
        <circle cx="150" cy="120" r="2" fill="${primaryColor}" opacity="0">
          <animate attributeName="opacity" 
                   values="0;1;0;1" dur="0.5s" 
                   begin="6s" repeatCount="2"/>
        </circle>
        
        <text x="150" y="260" text-anchor="middle" fill="#666" font-size="10">
          "${prompt.substring(0, 35)}..."
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