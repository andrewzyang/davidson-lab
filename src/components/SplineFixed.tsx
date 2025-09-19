'use client'

import { useEffect, useRef, useState } from 'react'

export default function SplineFixed() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadSpline = async () => {
      try {
        // Dynamically import the Spline viewer
        const { Application } = await import('@splinetool/runtime')
        
        if (!containerRef.current) return
        
        // Create canvas element
        const canvas = document.createElement('canvas')
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.position = 'absolute'
        canvas.style.top = '0'
        canvas.style.left = '0'
        containerRef.current.appendChild(canvas)
        
        // Initialize Spline application
        const app = new Application(canvas)
        
        // Determine the correct scene URL
        const baseUrl = process.env.NODE_ENV === 'development' 
          ? '' 
          : '/davidson-lab'
        
        const sceneUrl = `${baseUrl}/scene.splinecode`
        
        // Load the scene
        await app.load(sceneUrl)
        
        setIsLoading(false)
        console.log('Spline scene loaded successfully from:', sceneUrl)
      } catch (err) {
        console.error('Failed to load Spline scene:', err)
        setError(err instanceof Error ? err.message : 'Failed to load 3D content')
        setIsLoading(false)
      }
    }

    // Only run on client side
    if (typeof window !== 'undefined') {
      loadSpline()
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400 text-center">
          <div>Unable to load 3D content</div>
          <div className="text-sm mt-2">{error}</div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400">Loading 3D Scene...</div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{
          transform: 'scale(1.5)',
          transformOrigin: 'center center',
        }}
      />
    </div>
  )
}