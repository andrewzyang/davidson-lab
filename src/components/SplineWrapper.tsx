'use client'

import { useEffect, useState } from 'react'

export default function SplineWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400">Loading 3D Scene...</div>
      </div>
    )
  }

  // Use iframe as fallback for GitHub Pages
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
      <iframe
        src="https://my.spline.design/MJhg-3DcMKaywQna/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.5)',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          border: 'none'
        }}
        title="3D Scene"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}