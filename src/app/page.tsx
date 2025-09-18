'use client'

import SplineScene from '@/components/SplineScene'
import Footer from '@/components/layout/Footer'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [missionVisible, setMissionVisible] = useState(false)
  
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
        <SplineScene />
        
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
      <section ref={missionRef} className="relative z-10 min-h-screen flex items-center snap-section">
        <div className="max-w-7xl mx-auto w-full px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left Column - Heading */}
            <div className={`flex items-center justify-center h-full ${mounted && missionVisible ? 'animate-slideInLeft' : 'opacity-0 translate-x-[-50px]'}`}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-arial-nova font-bold leading-tight text-center">
                <span className="gradient-text-grey">Our Mission</span>
              </h2>
            </div>
            
            {/* Right Column - Description */}
            <div className={`space-y-6 ${mounted && missionVisible ? 'animate-slideInRight' : 'opacity-0 translate-x-[50px]'}`}>
              <p className={`text-lg md:text-xl text-gray-700 leading-relaxed font-arial-nova ${mounted && missionVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={mounted && missionVisible ? { animationDelay: '0.2s' } : {}}>
                Our research focuses on developing innovative neurosurgical interventions 
                for treatment-resistant psychiatric disorders. We combine cutting-edge 
                neurotechnology with precision psychiatry to restore function and improve 
                quality of life.
              </p>
              <p className={`text-lg md:text-xl text-gray-700 leading-relaxed font-arial-nova ${mounted && missionVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={mounted && missionVisible ? { animationDelay: '0.4s' } : {}}>
                Our research aims to help those with unmet medical needs and 
                unlock new understanding of the mind through precise neurosurgical therapies.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section - only for homepage */}
      <Footer />
    </div>
  )
}