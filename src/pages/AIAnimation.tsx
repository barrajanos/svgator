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
    "Telefon ikon ami kirajzolódik",
    "Menü vonalak egymás után megjelennek", 
    "Szív ami kirajzolódik és pulzál",
    "Nap sugarakkal ami ragyog",
    "Kör és négyzet kombinált ikon",
    "Háromszög ami forog és kirajzolódik",
    "Egyszerű vonalas gomb ikon",
    "Kérdőjel szimbólum animációval"
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
    
    // Intelligens ikon elemző és generáló rendszer
    const analyzePrompt = (text: string) => {
      const elements = {
        shapes: [],
        objects: [],
        actions: [],
        modifiers: []
      }
      
      // Alapvető formák felismerése
      if (text.includes('kör') || text.includes('circle')) elements.shapes.push('circle')
      if (text.includes('négyzet') || text.includes('square') || text.includes('doboz')) elements.shapes.push('rect')
      if (text.includes('háromszög') || text.includes('triangle')) elements.shapes.push('triangle')
      if (text.includes('vonal') || text.includes('line')) elements.shapes.push('line')
      if (text.includes('íves') || text.includes('curve')) elements.shapes.push('curve')
      
      // Objektumok
      const objectKeywords = {
        'tech': ['telefon', 'laptop', 'számítógép', 'tablet', 'wifi', 'bluetooth', 'usb'],
        'ui': ['menü', 'gomb', 'ikon', 'beállítás', 'profil', 'keresés', 'küldés'],
        'nature': ['fa', 'virág', 'nap', 'hold', 'csillag', 'felhő', 'víz'],
        'transport': ['autó', 'repülő', 'hajó', 'kerékpár', 'vonat'],
        'home': ['ház', 'ajtó', 'ablak', 'bútor', 'lámpa'],
        'symbols': ['szív', 'plus', 'mínusz', 'nyíl', 'kérdőjel', 'felkiáltójel']
      }
      
      for (const [category, keywords] of Object.entries(objectKeywords)) {
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            elements.objects.push({ type: keyword, category })
            break
          }
        }
      }
      
      // Akciók
      if (text.includes('mozog') || text.includes('mozgás')) elements.actions.push('move')
      if (text.includes('forog') || text.includes('forgás')) elements.actions.push('rotate')
      if (text.includes('pulzál') || text.includes('lüktet')) elements.actions.push('pulse')
      if (text.includes('ragyog') || text.includes('világít')) elements.actions.push('glow')
      if (text.includes('kirajzolódik') || text.includes('megjelenik')) elements.actions.push('draw')
      
      return elements
    }
    
    // Dinamikus SVG generátor
    const generateDynamicIcon = (analysis: any) => {
      let svgElements = []
      let animationDelay = 0
      
      // Ha nincs konkrét objektum, alapvető formákból építkezünk
      if (analysis.objects.length === 0) {
        // Véletlenszerű egyszerű ikon generálás a prompt hangulata alapján
        const centerX = 150, centerY = 150
        
        if (analysis.shapes.includes('circle')) {
          svgElements.push(`
            <circle cx="${centerX}" cy="${centerY}" r="40" 
                    stroke="${primaryColor}" ${commonStyles}
                    stroke-dasharray="250" stroke-dashoffset="250">
              <animate attributeName="stroke-dashoffset" 
                       values="250;0" dur="${getDuration('2s')}" 
                       begin="${animationDelay}s" fill="freeze"/>
            </circle>
          `)
          animationDelay += 1.5
        }
        
        if (analysis.shapes.includes('rect')) {
          svgElements.push(`
            <rect x="${centerX-30}" y="${centerY-30}" width="60" height="60" 
                  stroke="${primaryColor}" ${commonStyles}
                  stroke-dasharray="240" stroke-dashoffset="240">
              <animate attributeName="stroke-dashoffset" 
                       values="240;0" dur="${getDuration('2s')}" 
                       begin="${animationDelay}s" fill="freeze"/>
            </rect>
          `)
          animationDelay += 1.5
        }
        
        if (analysis.shapes.includes('triangle')) {
          svgElements.push(`
            <polygon points="${centerX},${centerY-30} ${centerX-30},${centerY+20} ${centerX+30},${centerY+20}" 
                     stroke="${primaryColor}" ${commonStyles}
                     stroke-dasharray="180" stroke-dashoffset="180">
              <animate attributeName="stroke-dashoffset" 
                       values="180;0" dur="${getDuration('1.8s')}" 
                       begin="${animationDelay}s" fill="freeze"/>
            </polygon>
          `)
          animationDelay += 1.5
        }
        
        // Ha nincs specifikus forma, generálunk egy általános ikont
        if (analysis.shapes.length === 0) {
          svgElements.push(`
            <circle cx="${centerX}" cy="${centerY}" r="35" 
                    stroke="${primaryColor}" ${commonStyles}
                    stroke-dasharray="220" stroke-dashoffset="220">
              <animate attributeName="stroke-dashoffset" 
                       values="220;0" dur="${getDuration('2s')}" 
                       begin="0s" fill="freeze"/>
            </circle>
            <circle cx="${centerX}" cy="${centerY}" r="15" 
                    stroke="${primaryColor}" stroke-width="1.5" fill="none"
                    stroke-dasharray="95" stroke-dashoffset="95">
              <animate attributeName="stroke-dashoffset" 
                       values="95;0" dur="${getDuration('1s')}" 
                       begin="1.5s" fill="freeze"/>
            </circle>
          `)
        }
      } else {
        // Specifikus objektumok alapján generálás
        const obj = analysis.objects[0]
        svgElements.push(generateObjectIcon(obj.type, primaryColor, getDuration, commonStyles))
      }
      
      // Animációk hozzáadása
      if (analysis.actions.includes('rotate')) {
        svgElements.push(`
          <animateTransform attributeName="transform" type="rotate" 
                            values="0 150 150;360 150 150" dur="${getDuration('3s')}" 
                            begin="${animationDelay + 1}s" repeatCount="indefinite"/>
        `)
      }
      
      if (analysis.actions.includes('pulse')) {
        svgElements.push(`
          <animateTransform attributeName="transform" type="scale" 
                            values="1;1.2;1" dur="${getDuration('1.5s')}" 
                            begin="${animationDelay + 1}s" repeatCount="indefinite"/>
        `)
      }
      
      return svgElements.join('')
    }
    
    // Egyszerű objektum ikon generátor
    const generateObjectIcon = (type: string, color: string, getDuration: any, styles: string) => {
      const simpleIcons = {
        'telefon': `
          <rect x="130" y="100" width="40" height="70" rx="8" 
                stroke="${color}" ${styles}
                stroke-dasharray="220" stroke-dashoffset="220">
            <animate attributeName="stroke-dashoffset" 
                     values="220;0" dur="${getDuration('2s')}" 
                     begin="0s" fill="freeze"/>
          </rect>
          <circle cx="150" cy="120" r="3" fill="${color}" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.3s" 
                     begin="2s" fill="freeze"/>
          </circle>
          <rect x="135" y="155" width="30" height="8" rx="4" 
                stroke="${color}" stroke-width="1.5" fill="none"
                stroke-dasharray="76" stroke-dashoffset="76">
            <animate attributeName="stroke-dashoffset" 
                     values="76;0" dur="${getDuration('1s')}" 
                     begin="2.2s" fill="freeze"/>
          </rect>
        `,
        'menü': `
          <line x1="120" y1="130" x2="180" y2="130" 
                stroke="${color}" ${styles}
                stroke-dasharray="60" stroke-dashoffset="60">
            <animate attributeName="stroke-dashoffset" 
                     values="60;0" dur="${getDuration('1s')}" 
                     begin="0s" fill="freeze"/>
          </line>
          <line x1="120" y1="150" x2="180" y2="150" 
                stroke="${color}" ${styles}
                stroke-dasharray="60" stroke-dashoffset="60">
            <animate attributeName="stroke-dashoffset" 
                     values="60;0" dur="${getDuration('1s')}" 
                     begin="0.5s" fill="freeze"/>
          </line>
          <line x1="120" y1="170" x2="180" y2="170" 
                stroke="${color}" ${styles}
                stroke-dasharray="60" stroke-dashoffset="60">
            <animate attributeName="stroke-dashoffset" 
                     values="60;0" dur="${getDuration('1s')}" 
                     begin="1s" fill="freeze"/>
          </line>
        `,
        'szív': `
          <path d="M 150 170 C 130 155, 110 135, 110 115 C 110 100, 125 85, 140 85 C 145 85, 150 90, 150 95 C 150 90, 155 85, 160 85 C 175 85, 190 100, 190 115 C 190 135, 170 155, 150 170 Z" 
                stroke="${color}" ${styles}
                stroke-dasharray="200" stroke-dashoffset="200">
            <animate attributeName="stroke-dashoffset" 
                     values="200;0" dur="${getDuration('2.5s')}" 
                     begin="0s" fill="freeze"/>
          </path>
        `,
        'nap': `
          <circle cx="150" cy="150" r="25" 
                  stroke="${color}" ${styles}
                  stroke-dasharray="157" stroke-dashoffset="157">
            <animate attributeName="stroke-dashoffset" 
                     values="157;0" dur="${getDuration('1.8s')}" 
                     begin="0s" fill="freeze"/>
          </circle>
          ${Array.from({length: 8}, (_, i) => {
            const angle = i * 45
            const x1 = 150 + Math.cos(angle * Math.PI / 180) * 35
            const y1 = 150 + Math.sin(angle * Math.PI / 180) * 35
            const x2 = 150 + Math.cos(angle * Math.PI / 180) * 50
            const y2 = 150 + Math.sin(angle * Math.PI / 180) * 50
            return `
              <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                    stroke="${color}" stroke-width="2.5" stroke-linecap="round"
                    stroke-dasharray="18" stroke-dashoffset="18">
                <animate attributeName="stroke-dashoffset" 
                         values="18;0" dur="${getDuration('0.4s')}" 
                         begin="${1.5 + i * 0.1}s" fill="freeze"/>
              </line>
            `
          }).join('')}
        `,
        'gomb': `
          <rect x="120" y="130" width="60" height="40" rx="20" 
                stroke="${color}" ${styles}
                stroke-dasharray="200" stroke-dashoffset="200">
            <animate attributeName="stroke-dashoffset" 
                     values="200;0" dur="${getDuration('2s')}" 
                     begin="0s" fill="freeze"/>
          </rect>
          <circle cx="150" cy="150" r="5" fill="${color}" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.3s" 
                     begin="2s" fill="freeze"/>
          </circle>
        `,
        'keresés': `
          <circle cx="140" cy="140" r="20" 
                  stroke="${color}" ${styles}
                  stroke-dasharray="125" stroke-dashoffset="125">
            <animate attributeName="stroke-dashoffset" 
                     values="125;0" dur="${getDuration('1.5s')}" 
                     begin="0s" fill="freeze"/>
          </circle>
          <line x1="155" y1="155" x2="170" y2="170" 
                stroke="${color}" stroke-width="3" stroke-linecap="round"
                stroke-dasharray="21" stroke-dashoffset="21">
            <animate attributeName="stroke-dashoffset" 
                     values="21;0" dur="${getDuration('0.8s')}" 
                     begin="1.5s" fill="freeze"/>
          </line>
        `,
        'plus': `
          <line x1="150" y1="120" x2="150" y2="180" 
                stroke="${color}" ${styles}
                stroke-dasharray="60" stroke-dashoffset="60">
            <animate attributeName="stroke-dashoffset" 
                     values="60;0" dur="${getDuration('1s')}" 
                     begin="0s" fill="freeze"/>
          </line>
          <line x1="120" y1="150" x2="180" y2="150" 
                stroke="${color}" ${styles}
                stroke-dasharray="60" stroke-dashoffset="60">
            <animate attributeName="stroke-dashoffset" 
                     values="60;0" dur="${getDuration('1s')}" 
                     begin="0.5s" fill="freeze"/>
          </line>
        `,
        'nyíl': `
          <line x1="120" y1="150" x2="170" y2="150" 
                stroke="${color}" ${styles}
                stroke-dasharray="50" stroke-dashoffset="50">
            <animate attributeName="stroke-dashoffset" 
                     values="50;0" dur="${getDuration('1.2s')}" 
                     begin="0s" fill="freeze"/>
          </line>
          <line x1="170" y1="150" x2="160" y2="140" 
                stroke="${color}" ${styles}
                stroke-dasharray="14" stroke-dashoffset="14">
            <animate attributeName="stroke-dashoffset" 
                     values="14;0" dur="${getDuration('0.5s')}" 
                     begin="1.2s" fill="freeze"/>
          </line>
          <line x1="170" y1="150" x2="160" y2="160" 
                stroke="${color}" ${styles}
                stroke-dasharray="14" stroke-dashoffset="14">
            <animate attributeName="stroke-dashoffset" 
                     values="14;0" dur="${getDuration('0.5s')}" 
                     begin="1.4s" fill="freeze"/>
          </line>
        `,
        'kérdőjel': `
          <path d="M 135 120 Q 135 105 150 105 Q 165 105 165 120 Q 165 135 150 135" 
                stroke="${color}" ${styles}
                stroke-dasharray="70" stroke-dashoffset="70">
            <animate attributeName="stroke-dashoffset" 
                     values="70;0" dur="${getDuration('2s')}" 
                     begin="0s" fill="freeze"/>
          </path>
          <circle cx="150" cy="155" r="3" fill="${color}" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.3s" 
                     begin="2s" fill="freeze"/>
          </circle>
        `,
        'ház': `
          <line x1="110" y1="180" x2="190" y2="180" 
                stroke="${color}" ${styles}
                stroke-dasharray="80" stroke-dashoffset="80">
            <animate attributeName="stroke-dashoffset" 
                     values="80;0" dur="${getDuration('1s')}" 
                     begin="0s" fill="freeze"/>
          </line>
          <line x1="110" y1="180" x2="110" y2="140" 
                stroke="${color}" ${styles}
                stroke-dasharray="40" stroke-dashoffset="40">
            <animate attributeName="stroke-dashoffset" 
                     values="40;0" dur="${getDuration('0.8s')}" 
                     begin="1s" fill="freeze"/>
          </line>
          <line x1="190" y1="180" x2="190" y2="140" 
                stroke="${color}" ${styles}
                stroke-dasharray="40" stroke-dashoffset="40">
            <animate attributeName="stroke-dashoffset" 
                     values="40;0" dur="${getDuration('0.8s')}" 
                     begin="1.2s" fill="freeze"/>
          </line>
          <path d="M 110 140 L 150 110 L 190 140" 
                stroke="${color}" ${styles}
                stroke-dasharray="80" stroke-dashoffset="80">
            <animate attributeName="stroke-dashoffset" 
                     values="80;0" dur="${getDuration('1.2s')}" 
                     begin="2s" fill="freeze"/>
          </path>
          <rect x="140" y="155" width="20" height="25" 
                stroke="${color}" ${styles}
                stroke-dasharray="90" stroke-dashoffset="90">
            <animate attributeName="stroke-dashoffset" 
                     values="90;0" dur="${getDuration('1s')}" 
                     begin="3s" fill="freeze"/>
          </rect>
        `
      }
      
      return simpleIcons[type] || `
        <circle cx="150" cy="150" r="30" 
                stroke="${color}" ${styles}
                stroke-dasharray="188" stroke-dashoffset="188">
          <animate attributeName="stroke-dashoffset" 
                   values="188;0" dur="${getDuration('2s')}" 
                   begin="0s" fill="freeze"/>
        </circle>
        <circle cx="150" cy="150" r="8" fill="${color}" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.3s" 
                   begin="2s" fill="freeze"/>
        </circle>
      ` // Fallback: általános ikon
    }
    
    // Főlogika
    const analysis = analyzePrompt(promptLower)
    const iconSVG = generateDynamicIcon(analysis)
    
    return `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        ${iconSVG}
        <text x="150" y="280" text-anchor="middle" fill="#666" font-size="9">
          "${prompt.substring(0, 40)}..."
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