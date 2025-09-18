'use client'

import { useEffect, useState } from 'react'

export default function SplineScene() {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    // Load Spline viewer script
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js'
    script.onload = () => setScriptLoaded(true)
    script.onerror = () => {
      console.error('Failed to load Spline viewer script')
      setScriptLoaded(false)
    }
    document.head.appendChild(script)
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
      {scriptLoaded ? (
        // @ts-ignore - Custom element
        <spline-viewer 
          url="https://prod.spline.design/MJhg-3DcMKaywQna/scene.splinecode"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="text-gray-400">Loading 3D Scene...</div>
        </div>
      )}
    </div>
  )
}