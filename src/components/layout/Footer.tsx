'use client'
import ContactForm from './ContactForm'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { getAssetPath } from '@/utils/basePath'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false)
          // Reset animation
          setTimeout(() => setIsVisible(true), 50)
        }
      },
      { threshold: 0.3 }
    )
    
    if (footerRef.current) {
      observer.observe(footerRef.current)
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])
  
  return (
    <footer ref={footerRef} id="contact" className="relative z-10 h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white snap-section">
      <div className="flex-1 flex flex-col px-6 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center gradient-text-grey transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>Get in Touch</h2>
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <ContactForm />
          </div>
          
          {/* Logos and Copyright Section */}
          <div className={`mt-6 md:mt-8 pt-4 border-t border-gray-200 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 mb-2">
              <div className="relative h-8 md:h-10 w-32 md:w-36">
                <div className="absolute inset-0 bg-gray-500" 
                     style={{
                       maskImage: `url('${getAssetPath('/logo-sunnybrook.svg')}')`,
                       maskSize: 'contain',
                       maskRepeat: 'no-repeat',
                       maskPosition: 'center',
                       WebkitMaskImage: `url('${getAssetPath('/logo-sunnybrook.svg')}')`,
                       WebkitMaskSize: 'contain',
                       WebkitMaskRepeat: 'no-repeat',
                       WebkitMaskPosition: 'center'
                     }} />
              </div>
              <div className="relative h-8 md:h-10 w-32 md:w-36">
                <div className="absolute inset-0 bg-gray-500"
                     style={{
                       maskImage: `url('${getAssetPath('/logo-uoft.svg')}')`,
                       maskSize: 'contain',
                       maskRepeat: 'no-repeat',
                       maskPosition: 'center',
                       WebkitMaskImage: `url('${getAssetPath('/logo-uoft.svg')}')`,
                       WebkitMaskSize: 'contain',
                       WebkitMaskRepeat: 'no-repeat',
                       WebkitMaskPosition: 'center'
                     }} />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-600">
                © {new Date().getFullYear()} Davidson's Neurosurgical Psychiatry Lab
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}