'use client'

import dynamic from 'next/dynamic'
import Footer from '@/components/layout/Footer'
import { useEffect, useState, useRef } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getAssetPath } from '@/utils/basePath'

// Use SplineClient for proper client-side loading
const SplineScene = dynamic(() => import('@/components/SplineClient'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center z-0 bg-gradient-to-br from-gray-50 to-gray-100"><div className="text-gray-400">Loading 3D Scene...</div></div>
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [missionVisible, setMissionVisible] = useState(false)
  const [missionImageShown, setMissionImageShown] = useState(false)
  const [missionTextShown, setMissionTextShown] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setMounted(true)
    setHeroVisible(true) // Start hero animation immediately
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === missionRef.current && entry.isIntersecting) {
            setMissionVisible(true)
            // Sequential animation: image first, then fade, then text (50% faster)
            setTimeout(() => setMissionImageShown(true), 100)
            setTimeout(() => setMissionTextShown(true), 1250)
          }
        })
      },
      { threshold: 0.5 }
    )
    
    if (missionRef.current) observer.observe(missionRef.current)
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div className="snap-container h-screen overflow-y-scroll absolute inset-0">
      {/* Hero Section with Spline */}
      <div ref={heroRef} className="relative min-h-screen overflow-hidden snap-section">
        <ErrorBoundary>
          <SplineScene />
        </ErrorBoundary>
        
        {/* Title Overlay */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-8 py-20 w-full">
            <div className="max-w-2xl">
              <h1 className={`text-5xl md:text-7xl font-arial-nova font-bold mb-6 ${mounted && heroVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <span className={`inline-block gradient-text-grey ${mounted && heroVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={mounted && heroVisible ? { animationDelay: '0.1s' } : {}}>Davidson's</span><br />
                <span className={`inline-block gradient-text-grey ${mounted && heroVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={mounted && heroVisible ? { animationDelay: '0.3s' } : {}}>Neurosurgical</span><br />
                <span className={`inline-block gradient-text-grey ${mounted && heroVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={mounted && heroVisible ? { animationDelay: '0.5s' } : {}}>Psychiatry Lab</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section ref={missionRef} className="relative z-10 min-h-screen flex items-center snap-section overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 flex">
          {/* Image Container - Starts full width, then shrinks to left half */}
          <div 
            className={`absolute inset-y-0 left-0 transition-all ${
              missionImageShown 
                ? (missionTextShown ? 'w-1/2' : 'w-full') 
                : 'w-full'
            }`}
            style={{
              transitionDuration: '1250ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: missionTextShown ? '0ms' : '0ms'
            }}
          >
            <div 
              className={`relative w-full h-full transition-all ${
                missionImageShown ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url("${getAssetPath('/ghbc-banner.jpg')}")`,
                backgroundSize: 'cover',
                backgroundPosition: missionTextShown ? '20% center' : 'center',
                backgroundRepeat: 'no-repeat',
                transitionDuration: '1250ms'
              }}
            >
              {/* Gradient overlay - completely transparent */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent transition-opacity duration-2000 ${
                missionTextShown ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>
          </div>
          
          {/* Gradient background for right side */}
          <div 
            className={`absolute inset-y-0 right-0 bg-gradient-to-br from-gray-50 to-white transition-all ${
              missionTextShown ? 'w-1/2' : 'w-0'
            }`}
            style={{
              transitionDuration: '2500ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 w-full">
          <div className={`grid grid-cols-1 ${missionTextShown ? 'lg:grid-cols-2' : ''} transition-all duration-1250`}>
            {/* Left side - Empty space for image */}
            <div className={`${missionTextShown ? 'block' : 'hidden'}`} />
            
            {/* Right side - Text Content */}
            <div className={`flex items-center justify-center px-8 md:px-12 lg:px-16 transition-all duration-700 ${
              missionTextShown ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="max-w-xl">
                {/* Heading */}
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-arial-nova font-bold mb-8 transition-all duration-700 delay-300 ${
                  missionTextShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <span className="gradient-text-grey">Mission</span>
                </h2>
                
                {/* Description */}
                <div className="space-y-6">
                  <p className={`text-lg md:text-xl text-gray-700 leading-relaxed font-arial-nova transition-all duration-700 delay-400 ${
                    missionTextShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    Our research focuses on developing innovative neurosurgical interventions 
                    for treatment-resistant psychiatric disorders. We combine cutting-edge 
                    neurotechnology with precision psychiatry to restore function and improve 
                    quality of life.
                  </p>
                  <p className={`text-lg md:text-xl text-gray-700 leading-relaxed font-arial-nova transition-all duration-700 delay-500 ${
                    missionTextShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    We hope to help those with unmet medical needs and 
                    unlock new understanding of the mind through precise neurosurgical therapies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section - only for homepage */}
      <Footer />
    </div>
  )
}