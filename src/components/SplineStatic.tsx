'use client'

import { useEffect, useState } from 'react'

export default function SplineStatic() {
  const [SplineComponent, setSplineComponent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    
    const loadSpline = async () => {
      try {
        // Only import on client side
        if (typeof window === 'undefined') return
        
        const SplineModule = await import('@splinetool/react-spline')
        
        if (!mounted) return
        
        setSplineComponent(() => SplineModule.default)
      } catch (err) {
        console.error('Failed to load Spline:', err)
        setError('Failed to load 3D content')
      }
    }
    
    loadSpline()
    
    return () => {
      mounted = false
    }
  }, [])

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400">{error}</div>
      </div>
    )
  }

  if (!SplineComponent) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400">Loading 3D Scene...</div>
      </div>
    )
  }

  // Build the correct URL for the scene
  const sceneUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? 'https://andrewzyang.github.io/davidson-lab/scene.splinecode'
    : '/scene.splinecode'

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
      <SplineComponent
        scene={sceneUrl}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.5)',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        onLoad={() => console.log('Spline scene loaded from:', sceneUrl)}
        onError={(e: any) => {
          console.error('Spline error:', e)
          setError('Unable to load 3D content')
        }}
      />
    </div>
  )
}