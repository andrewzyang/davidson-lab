'use client'

import Image from 'next/image'
import PlaceholderImage from './PlaceholderImage'
import { useState, useRef } from 'react'

interface TeamMemberProps {
  name: string
  title: string
  imageUrl: string
  bio?: string
  altText?: string
}

export default function TeamMember({ name, title, imageUrl, bio, altText }: TeamMemberProps) {
  const [imageError, setImageError] = useState(false)
  const [showBio, setShowBio] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const useRealImage = imageUrl.startsWith('http') || imageUrl.includes('.')
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({
      x: (y - 0.5) * -5, // Tilt on X-axis based on vertical position (reduced by 50%)
      y: (x - 0.5) * 5   // Tilt on Y-axis based on horizontal position (reduced by 50%)
    })
  }

  const handleMouseLeave = () => {
    setShowBio(false)
    setTilt({ x: 0, y: 0 })
  }
  
  return (
    <div 
      ref={cardRef}
      className="relative group cursor-pointer transform-gpu transition-all duration-500 hover:scale-[1.025]"
      onMouseEnter={() => setShowBio(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div 
        className="aspect-[3/4] relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: `
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.18)
          `,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${showBio ? '15px' : '0px'})`,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Glass reflection overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
            transform: showBio ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        
        {!imageError && useRealImage ? (
          <Image
            src={imageUrl}
            alt={altText || `${name} - ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300">
            <PlaceholderImage name={name} className="w-full h-full" />
          </div>
        )}
        
        {/* Name and Title - Always Visible */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 ${showBio && bio ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="text-white text-lg font-semibold mb-1">{name}</h3>
          <p className="text-gray-200 text-sm">{title}</p>
        </div>
        
        {/* Bio Overlay - Shows on Hover */}
        {bio && (
          <div className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-all duration-300 ${showBio ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="h-full flex flex-col justify-end p-6 overflow-y-auto">
              <div className="space-y-3">
                <div>
                  <h3 className="text-white text-xl font-semibold">{name}</h3>
                  <p className="text-gray-300 text-sm uppercase tracking-wide">{title}</p>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}