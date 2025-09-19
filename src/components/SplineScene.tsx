'use client'

import { Suspense, lazy, useEffect, useState } from 'react'

// Dynamically import Spline to avoid SSR issues
const Spline = lazy(() => import('@splinetool/react-spline'))

export default function SplineScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Inject CSS to hide watermark after mount
    const style = document.createElement('style')
    style.innerHTML = `
      /* Hide Spline watermark - comprehensive approach */
      [class*="logo"], [class*="watermark"], [class*="spline-watermark"],
      [id*="logo"], [id*="watermark"], [class*="brand"],
      canvas + div, canvas ~ div[style*="position: absolute"],
      div[style*="bottom: 10px"][style*="right: 10px"],
      div[style*="bottom: 20px"][style*="right: 20px"],
      a[href*="spline.design"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `
    document.head.appendChild(style)
    
    // Aggressive watermark removal using MutationObserver
    const removeWatermark = () => {
      // Target specific elements that might contain the watermark
      const selectors = [
        'a[href*="spline.design"]',
        'div[style*="position: absolute"][style*="bottom"]',
        '[class*="watermark"]',
        '[class*="logo"]',
        '[class*="spline-watermark"]',
        '[id*="watermark"]',
        '[id*="logo"]',
      ]
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          // Check if element contains "Built with Spline" text
          if (el.textContent?.includes('Built') || 
              el.textContent?.includes('Spline') ||
              el.innerHTML?.includes('spline.design')) {
            el.remove()
          }
        })
      })
    }
    
    // Run removal immediately and after delays
    const timeouts = [100, 500, 1000, 2000, 3000, 5000].map(
      delay => setTimeout(removeWatermark, delay)
    )
    
    // Set up MutationObserver to catch dynamically added watermarks
    const observer = new MutationObserver(() => {
      removeWatermark()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'id']
    })
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
      timeouts.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-400">Loading 3D Scene...</div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 z-0">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="text-gray-400">Loading 3D Scene...</div>
        </div>
      }>
        <Spline 
          scene="https://prod.spline.design/MJhg-3DcMKaywQna/scene.splinecode"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            imageRendering: 'auto',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
        />
      </Suspense>
    </div>
  )
}