'use client'

import Image from 'next/image'
import PlaceholderImage from './PlaceholderImage'
import { useState } from 'react'

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
  const useRealImage = imageUrl.startsWith('http') || imageUrl.includes('.')
  
  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setShowBio(true)}
      onMouseLeave={() => setShowBio(false)}
    >
      <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
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