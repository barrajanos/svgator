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
    "Szív ami lüktet és kirajzolódik", 
    "Ház ikon építése step-by-step",
    "Keresés ikon nagyítóval",
    "Menü hamburger ikonnal",
    "Plus ikon hozzáadás animációval",
    "Nap sugarakkal ami ragyog",
    "Lakat biztonsági ikon kirajzolódva",
    "Laptop megnyitás animáció",
    "Autó ikon mozgással",
    "Nyíl ikon irányjelzéssel",
    "Kérdőjel help szimbólum"
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
    
    // Profi SVG ikon könyvtár (Lucide/Heroicons stílusú path-okkal)
    const professionalIcons: Record<string, { path: string; length: string }> = {
      'telefon': {
        path: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
        length: '130'
      },
      'szív': {
        path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        length: '145'
      },
      'ház': {
        path: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
        length: '120'
      },
      'keresés': {
        path: 'M11 2a9 9 0 1 0 6.36 15.36L21 21l3-3-3.64-3.64A9 9 0 0 0 11 2z',
        length: '95'
      },
      'menü': {
        path: 'M3 12h18 M3 6h18 M3 18h18',
        length: '108'
      },
      'plus': {
        path: 'M12 5v14 M5 12h14',
        length: '56'
      },
      'nyíl': {
        path: 'M5 12h14 M12 5l7 7-7 7',
        length: '70'
      },
      'nap': {
        path: 'M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
        length: '280'
      },
      'lakat': {
        path: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
        length: '165'
      },
      'gomb': {
        path: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
        length: '155'
      },
      'laptop': {
        path: 'M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16',
        length: '175'
      },
      'autó': {
        path: 'M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0H9',
        length: '240'
      },
      'kérdőjel': {
        path: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01',
        length: '85'
      }
    }

    // Debug és egyszerűsített ikon kiválasztó
    const selectIcon = (text: string) => {
      console.log('🔍 Keresett szöveg:', text)
      
      // Explicit if-else logika minden ikonhoz
      if (text.includes('telefon') || text.includes('phone') || text.includes('call')) {
        console.log('✅ Telefon ikon kiválasztva')
        return professionalIcons['telefon']
      }
      
      if (text.includes('ház') || text.includes('home') || text.includes('otthon') || text.includes('épület')) {
        console.log('✅ Ház ikon kiválasztva')
        return professionalIcons['ház']
      }
      
      if (text.includes('keresés') || text.includes('search') || text.includes('find') || text.includes('nagyító')) {
        console.log('✅ Keresés ikon kiválasztva')
        return professionalIcons['keresés']
      }
      
      if (text.includes('menü') || text.includes('menu') || text.includes('hamburger') || text.includes('vonal')) {
        console.log('✅ Menü ikon kiválasztva')
        return professionalIcons['menü']
      }
      
      if (text.includes('plus') || text.includes('add') || text.includes('hozzáad') || text.includes('create') || text.includes('+')) {
        console.log('✅ Plus ikon kiválasztva')
        return professionalIcons['plus']
      }
      
      if (text.includes('nyíl') || text.includes('arrow') || text.includes('forward') || text.includes('irány')) {
        console.log('✅ Nyíl ikon kiválasztva')
        return professionalIcons['nyíl']
      }
      
      if (text.includes('nap') || text.includes('sun') || text.includes('light') || text.includes('sugár') || text.includes('világít')) {
        console.log('✅ Nap ikon kiválasztva')
        return professionalIcons['nap']
      }
      
      if (text.includes('lakat') || text.includes('lock') || text.includes('security') || text.includes('biztonság')) {
        console.log('✅ Lakat ikon kiválasztva')
        return professionalIcons['lakat']
      }
      
      if (text.includes('gomb') || text.includes('button') || text.includes('notification') || text.includes('értesítés')) {
        console.log('✅ Gomb ikon kiválasztva')
        return professionalIcons['gomb']
      }
      
      if (text.includes('laptop') || text.includes('computer') || text.includes('számítógép') || text.includes('pc')) {
        console.log('✅ Laptop ikon kiválasztva')
        return professionalIcons['laptop']
      }
      
      if (text.includes('autó') || text.includes('car') || text.includes('vehicle') || text.includes('jármű') || text.includes('kocsi')) {
        console.log('✅ Autó ikon kiválasztva')
        return professionalIcons['autó']
      }
      
      if (text.includes('kérdőjel') || text.includes('question') || text.includes('help') || text.includes('segítség') || text.includes('?')) {
        console.log('✅ Kérdőjel ikon kiválasztva')
        return professionalIcons['kérdőjel']
      }
      
      if (text.includes('szív') || text.includes('heart') || text.includes('love') || text.includes('szerelem')) {
        console.log('✅ Szív ikon kiválasztva')
        return professionalIcons['szív']
      }
      
      // Ha semmi nem található, véletlenszerűen választunk egyet (nem mindig szív!)
      const iconKeys = Object.keys(professionalIcons)
      const randomIcon = iconKeys[Math.floor(Math.random() * iconKeys.length)]
      console.log('⚠️ Fallback ikon:', randomIcon)
      return professionalIcons[randomIcon]
    }

    const selectedIcon = selectIcon(promptLower)
    
    // Több path esetén külön kezelés
    const paths = selectedIcon.path.split(' M').filter((p: string) => p.length > 0)
    let svgContent = ''
    let cumulativeDelay = 0
    
    paths.forEach((pathData: string, index: number) => {
      const fullPath = index === 0 ? pathData : 'M' + pathData
      const pathLength = Math.round(parseFloat(selectedIcon.length) / paths.length)
      
      // Különböző effektek a prompt alapján
      let additionalEffects = ''
      if (promptLower.includes('pulzál') || promptLower.includes('lüktet')) {
        additionalEffects = `
          <animateTransform attributeName="transform" type="scale" 
                            values="1;1.15;1" dur="${getDuration('1.2s')}" 
                            begin="${cumulativeDelay + 3}s" repeatCount="indefinite"
                            transform-origin="150 150"/>
        `
      }
      if (promptLower.includes('forog') || promptLower.includes('forgás')) {
        additionalEffects += `
          <animateTransform attributeName="transform" type="rotate" 
                            values="0;360" dur="${getDuration('3s')}" 
                            begin="${cumulativeDelay + 2.5}s" repeatCount="indefinite"
                            transform-origin="150 150"/>
        `
      }
      if (promptLower.includes('ragyog') || promptLower.includes('világít')) {
        additionalEffects += `
          <animate attributeName="filter" 
                   values="none;url(#glow);none" dur="${getDuration('2s')}" 
                   begin="${cumulativeDelay + 2}s" repeatCount="indefinite"/>
        `
      }
      
      svgContent += `
        <g>
          <path d="${fullPath}" 
                stroke="${primaryColor}" 
                stroke-width="2.5" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                stroke-dasharray="${pathLength}" 
                stroke-dashoffset="${pathLength}">
            <animate attributeName="stroke-dashoffset" 
                     values="${pathLength};0" 
                     dur="${getDuration('2.5s')}" 
                     begin="${cumulativeDelay}s" 
                     fill="freeze"
                     calcMode="spline"
                     keySplines="0.4 0.0 0.2 1"
                     keyTimes="0;1"/>
          </path>
          ${additionalEffects}
        </g>
      `
      
      cumulativeDelay += parseFloat(getDuration('1.2s'))
    })
    
    // Glow filter
    const glowFilter = promptLower.includes('ragyog') || promptLower.includes('világít') ? `
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    ` : ''
    
    return `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        ${glowFilter}
        <g transform="translate(150, 150) scale(6) translate(-12, -12)">
          ${svgContent}
        </g>
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