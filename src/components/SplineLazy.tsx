'use client'

import { Suspense, lazy } from 'react'
import { getAssetPath } from '@/utils/basePath'

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function SplineLazy() {
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading 3D Scene...</div>
        </div>
      }>
        <Spline 
          scene={getAssetPath('/scene.splinecode')}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)',
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        />
      </Suspense>
    </div>
  )
}