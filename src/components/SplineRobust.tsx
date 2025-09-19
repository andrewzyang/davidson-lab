'use client'

import { useEffect, useState, useRef } from 'react'

export default function SplineRobust() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [SplineComponent, setSplineComponent] = useState<any>(null)
  const [useIframe, setUseIframe] = useState(false)

  useEffect(() => {
    let mounted = true
    
    const loadSpline = async () => {
      try {
        // Skip on server
        if (typeof window === 'undefined') return
        
        // Try loading the React component first
        const SplineModule = await import('@splinetool/react-spline')
        
        if (!mounted) return
        
        // Test if the component can be instantiated
        if (SplineModule.default) {
          setSplineComponent(() => SplineModule.default)
          setIsLoading(false)
        } else {
          throw new Error('Spline component not available')
        }
      } catch (err) {
        console.error('Failed to load Spline component, falling back to iframe:', err)
        if (!mounted) return
        
        // Fallback to iframe approach
        setUseIframe(true)
        setIsLoading(false)
      }
    }
    
    loadSpline()
    
    return () => {
      mounted = false
    }
  }, [])

  // Determine the correct scene URL
  const getSceneUrl = () => {
    if (typeof window === 'undefined') return '/scene.splinecode'
    
    // Use absolute URL for production
    if (window.location.hostname !== 'localhost') {
      return 'https://andrewzyang.github.io/davidson-lab/scene.splinecode'
    }
    
    return '/scene.splinecode'
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400">Loading 3D Scene...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400 text-center">
          <div>Unable to load 3D content</div>
          <div className="text-xs mt-2 opacity-50">{error}</div>
        </div>
      </div>
    )
  }

  // Iframe fallback
  if (useIframe) {
    const iframeUrl = `https://my.spline.design/untitled-c5f3a9b3e3f3a9b3e3f3a9b3e3f3a9b3/?file=${encodeURIComponent(getSceneUrl())}`
    
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)',
            width: '100%',
            height: '100%',
            border: 'none',
            pointerEvents: 'none'
          }}
          allow="autoplay; fullscreen"
          onLoad={() => console.log('Spline iframe loaded')}
          onError={() => setError('Failed to load 3D scene')}
        />
      </div>
    )
  }

  // Primary approach with React component
  if (SplineComponent) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
        <SplineComponent
          scene={getSceneUrl()}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)',
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
          onLoad={() => console.log('Spline scene loaded successfully from:', getSceneUrl())}
          onError={(e: any) => {
            console.error('Spline component error:', e)
            // Try iframe fallback
            setUseIframe(true)
          }}
        />
      </div>
    )
  }

  // Should not reach here
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-gray-400">Unable to initialize 3D scene</div>
    </div>
  )
}