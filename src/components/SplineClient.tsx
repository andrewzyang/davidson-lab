'use client'

import { useEffect, useState } from 'react'

export default function SplineClient() {
  const [isClient, setIsClient] = useState(false)
  const [SplineComponent, setSplineComponent] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    // Only import Spline on client side after mount
    if (typeof window !== 'undefined') {
      import('@splinetool/react-spline').then((mod) => {
        setSplineComponent(() => mod.default)
      }).catch(err => {
        console.error('Failed to load Spline:', err)
      })
    }
  }, [])

  if (!isClient || !SplineComponent) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400">Loading 3D Scene...</div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
      <SplineComponent
        scene={typeof window !== 'undefined' ? `${window.location.origin}/davidson-lab/scene.splinecode` : '/davidson-lab/scene.splinecode'}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.5)',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        onLoad={() => console.log('Spline scene loaded')}
        onError={(e: any) => console.error('Spline error:', e)}
      />
    </div>
  )
}