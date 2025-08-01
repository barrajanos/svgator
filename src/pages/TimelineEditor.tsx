import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Plus, 
  Trash2, 
  Copy,
  Download,
  Upload,
  Layers,
  Eye,
  EyeOff
} from 'lucide-react'

interface Keyframe {
  id: string
  time: number
  properties: {
    x: number
    y: number
    rotation: number
    scaleX: number
    scaleY: number
    opacity: number
    fill: string
  }
}

interface Layer {
  id: string
  name: string
  visible: boolean
  locked: boolean
  keyframes: Keyframe[]
  element: string // SVG element code
}

interface TimelineState {
  currentTime: number
  duration: number
  isPlaying: boolean
  fps: number
  zoom: number
}

const TimelineEditor = () => {
  const [timeline, setTimeline] = useState<TimelineState>({
    currentTime: 0,
    duration: 5,
    isPlaying: false,
    fps: 30,
    zoom: 1
  })

  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      name: 'Kör',
      visible: true,
      locked: false,
      keyframes: [
        {
          id: 'k1',
          time: 0,
          properties: {
            x: 100,
            y: 100,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            fill: '#3B82F6'
          }
        },
        {
          id: 'k2',
          time: 2,
          properties: {
            x: 200,
            y: 150,
            rotation: 180,
            scaleX: 1.5,
            scaleY: 1.5,
            opacity: 0.8,
            fill: '#8B5CF6'
          }
        }
      ],
      element: '<circle cx="0" cy="0" r="30" />'
    }
  ])

  const [selectedLayer, setSelectedLayer] = useState<string>('1')
  const [selectedKeyframe, setSelectedKeyframe] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const addKeyframe = (layerId: string, time: number) => {
    const layer = layers.find(l => l.id === layerId)
    if (!layer) return

    const newKeyframe: Keyframe = {
      id: Date.now().toString(),
      time,
      properties: {
        x: 150,
        y: 150,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        fill: '#3B82F6'
      }
    }

    setLayers(prev => prev.map(l => 
      l.id === layerId 
        ? { ...l, keyframes: [...l.keyframes, newKeyframe].sort((a, b) => a.time - b.time) }
        : l
    ))
  }

  const removeKeyframe = (layerId: string, keyframeId: string) => {
    setLayers(prev => prev.map(l => 
      l.id === layerId 
        ? { ...l, keyframes: l.keyframes.filter(k => k.id !== keyframeId) }
        : l
    ))
  }

  const addLayer = () => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      name: `Réteg ${layers.length + 1}`,
      visible: true,
      locked: false,
      keyframes: [],
      element: '<rect x="-25" y="-25" width="50" height="50" />'
    }
    setLayers(prev => [...prev, newLayer])
  }

  const togglePlayPause = () => {
    setTimeline(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
  }

  const stopAnimation = () => {
    setTimeline(prev => ({ ...prev, isPlaying: false, currentTime: 0 }))
  }

  const exportAnimation = () => {
    const svgCode = generateSVGAnimation()
    const element = document.createElement('a')
    const file = new Blob([svgCode], { type: 'image/svg+xml' })
    element.href = URL.createObjectURL(file)
    element.download = 'timeline-animation.svg'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const generateSVGAnimation = (): string => {
    return `
      <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        ${layers.map(layer => {
          if (!layer.visible || layer.keyframes.length === 0) return ''
          
          const firstKeyframe = layer.keyframes[0]
          return `
            <g transform="translate(${firstKeyframe.properties.x}, ${firstKeyframe.properties.y})">
              ${layer.element.replace('<', `<`).replace('/>', ` fill="${firstKeyframe.properties.fill}"/>`)}
              <animateTransform
                attributeName="transform"
                type="translate"
                values="${layer.keyframes.map(k => `${k.properties.x} ${k.properties.y}`).join(';')}"
                dur="${timeline.duration}s"
                repeatCount="indefinite"/>
            </g>
          `
        }).join('')}
      </svg>
    `
  }

  // Animáció lejátszás
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timeline.isPlaying) {
      interval = setInterval(() => {
        setTimeline(prev => {
          const nextTime = prev.currentTime + (1 / prev.fps)
          if (nextTime >= prev.duration) {
            return { ...prev, currentTime: 0 }
          }
          return { ...prev, currentTime: nextTime }
        })
      }, 1000 / timeline.fps)
    }
    return () => clearInterval(interval)
  }, [timeline.isPlaying, timeline.fps])

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Timeline Editor
          </h1>
          <p className="text-xl text-gray-600">
            Készíts komplex animációkat frame-by-frame szerkesztéssel
          </p>
        </div>

        <div className="space-y-6">
          {/* Vezérlő panel */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setTimeline(prev => ({ ...prev, currentTime: 0 }))}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <SkipBack size={20} />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                  >
                    {timeline.isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={stopAnimation}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Square size={20} />
                  </button>
                  <button
                    onClick={() => setTimeline(prev => ({ ...prev, currentTime: prev.duration }))}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <SkipForward size={20} />
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  {timeline.currentTime.toFixed(2)}s / {timeline.duration}s
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">FPS:</label>
                  <select
                    value={timeline.fps}
                    onChange={(e) => setTimeline(prev => ({ ...prev, fps: Number(e.target.value) }))}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value={24}>24</option>
                    <option value={30}>30</option>
                    <option value={60}>60</option>
                  </select>
                </div>

                <button
                  onClick={exportAnimation}
                  className="btn-primary flex items-center"
                >
                  <Download size={16} className="mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Canvas terület */}
            <div className="lg:col-span-3 space-y-4">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vászon</h3>
                <div 
                  ref={canvasRef}
                  className="w-full h-80 bg-gray-50 border border-gray-200 rounded-lg relative overflow-hidden"
                >
                  <svg width="100%" height="100%" viewBox="0 0 400 300">
                    {layers.map(layer => {
                      if (!layer.visible) return null
                      
                      // Interpoláció a keyframe-ek között
                      const currentKeyframe = layer.keyframes.find(k => k.time <= timeline.currentTime) || layer.keyframes[0]
                      const nextKeyframe = layer.keyframes.find(k => k.time > timeline.currentTime)
                      
                      if (!currentKeyframe) return null
                      
                      let properties = currentKeyframe.properties
                      
                      if (nextKeyframe) {
                        const progress = (timeline.currentTime - currentKeyframe.time) / (nextKeyframe.time - currentKeyframe.time)
                        properties = {
                          x: currentKeyframe.properties.x + (nextKeyframe.properties.x - currentKeyframe.properties.x) * progress,
                          y: currentKeyframe.properties.y + (nextKeyframe.properties.y - currentKeyframe.properties.y) * progress,
                          rotation: currentKeyframe.properties.rotation + (nextKeyframe.properties.rotation - currentKeyframe.properties.rotation) * progress,
                          scaleX: currentKeyframe.properties.scaleX + (nextKeyframe.properties.scaleX - currentKeyframe.properties.scaleX) * progress,
                          scaleY: currentKeyframe.properties.scaleY + (nextKeyframe.properties.scaleY - currentKeyframe.properties.scaleY) * progress,
                          opacity: currentKeyframe.properties.opacity + (nextKeyframe.properties.opacity - currentKeyframe.properties.opacity) * progress,
                          fill: currentKeyframe.properties.fill
                        }
                      }
                      
                      return (
                        <g
                          key={layer.id}
                          transform={`translate(${properties.x}, ${properties.y}) rotate(${properties.rotation}) scale(${properties.scaleX}, ${properties.scaleY})`}
                          opacity={properties.opacity}
                        >
                          <g dangerouslySetInnerHTML={{ 
                            __html: layer.element.replace('fill="', `fill="${properties.fill}" original-fill="`)
                          }} />
                        </g>
                      )
                    })}
                    
                    {/* Időpont jelölő */}
                    <line 
                      x1={timeline.currentTime / timeline.duration * 400} 
                      y1="0" 
                      x2={timeline.currentTime / timeline.duration * 400} 
                      y2="300" 
                      stroke="#EF4444" 
                      strokeWidth="2"
                      opacity="0.7"
                    />
                  </svg>
                </div>
              </div>

              {/* Timeline */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                <div className="space-y-2">
                  {layers.map(layer => (
                    <div key={layer.id} className="flex items-center">
                      <div className="w-32 flex items-center space-x-2">
                        <button
                          onClick={() => setLayers(prev => prev.map(l => 
                            l.id === layer.id ? { ...l, visible: !l.visible } : l
                          ))}
                        >
                          {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <span className="text-sm font-medium truncate">{layer.name}</span>
                      </div>
                      
                      <div className="flex-1 relative h-8 bg-gray-100 rounded">
                        {/* Keyframe-ek */}
                        {layer.keyframes.map(keyframe => (
                          <button
                            key={keyframe.id}
                            onClick={() => setSelectedKeyframe(keyframe.id)}
                            className={`absolute top-1 w-6 h-6 rounded-full border-2 transition-colors ${
                              selectedKeyframe === keyframe.id
                                ? 'bg-primary-600 border-primary-800'
                                : 'bg-primary-400 border-primary-600'
                            }`}
                            style={{ left: `${(keyframe.time / timeline.duration) * 100}%` }}
                          />
                        ))}
                        
                        {/* Idő jelölő */}
                        <div
                          className="absolute top-0 w-0.5 h-8 bg-red-500"
                          style={{ left: `${(timeline.currentTime / timeline.duration) * 100}%` }}
                        />
                      </div>
                      
                      <button
                        onClick={() => addKeyframe(layer.id, timeline.currentTime)}
                        className="ml-2 p-1 rounded bg-green-100 hover:bg-green-200 transition-colors"
                      >
                        <Plus size={16} className="text-green-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rétegek és tulajdonságok */}
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Rétegek</h3>
                  <button
                    onClick={addLayer}
                    className="btn-primary flex items-center text-sm"
                  >
                    <Plus size={16} className="mr-1" />
                    Új réteg
                  </button>
                </div>
                
                <div className="space-y-2">
                  {layers.map(layer => (
                    <div
                      key={layer.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedLayer === layer.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedLayer(layer.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{layer.name}</span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setLayers(prev => prev.map(l => 
                                l.id === layer.id ? { ...l, visible: !l.visible } : l
                              ))
                            }}
                          >
                            {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setLayers(prev => prev.filter(l => l.id !== layer.id))
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {layer.keyframes.length} keyframe
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedKeyframe && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Keyframe Tulajdonságok
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pozíció X
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="400"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pozíció Y
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Forgatás
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Átlátszóság
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TimelineEditor 