'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-transparent">
      <div className="flex items-center justify-between px-8 py-4 relative z-10">
        <div className="flex items-center space-x-8 relative z-10">
          <Link href="/" className="relative h-12 w-12 hover:scale-110 transition-transform duration-300 mr-4">
            <Image
              src="/davidson-lab-logo-icon.png"
              alt="Davidson Lab"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <Link
            href="/"
            className={`${
              isActive('/') 
                ? 'gradient-text' 
                : 'text-gray-700 hover:text-gray-900'
            } font-medium text-base tracking-wide transition-all duration-300 hover:scale-105`}
          >
            About
          </Link>
          <Link
            href="/team"
            className={`${
              isActive('/team') 
                ? 'gradient-text' 
                : 'text-gray-700 hover:text-gray-900'
            } font-medium text-base tracking-wide transition-all duration-300 hover:scale-105`}
          >
            Team
          </Link>
          <Link
            href="/research"
            className={`${
              isActive('/research') 
                ? 'gradient-text' 
                : 'text-gray-700 hover:text-gray-900'
            } font-medium text-base tracking-wide transition-all duration-300 hover:scale-105`}
          >
            Research
          </Link>
          <a
            href="#contact"
            className="px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-gray-500 to-gray-700 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Contact
          </a>
        </div>
        
        {/* Sunnybrook Logo */}
        <a 
          href="https://research.sunnybrook.ca/research/centres/harquail-centre-for-neuromodulation/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-24 w-72 hover:scale-105 transition-transform duration-300"
        >
          <Image
            src="/sunnybrook-logo.webp"
            alt="Harquail Centre for Neuromodulation"
            fill
            className="object-contain"
            priority
          />
        </a>
      </div>
    </nav>
  )
}
