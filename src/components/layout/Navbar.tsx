'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import davidsonLogo from '../../../public/davidson-lab-logo-icon-new.png'
import sunnybrookLogo from '../../../public/sunnybrook-logo-new.png'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const isActive = (path: string) => pathname === path
  
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === '/') {
      // If already on home page, reload it
      window.location.reload()
    } else {
      // Navigate to home
      router.push('/')
    }
  }
  
  return (
    <nav className="fixed top-4 left-4 right-4 z-[100] bg-white/20 backdrop-blur-md border border-white/10 shadow-md rounded-full">
      <div className="flex items-center justify-between px-6 py-2 relative z-10">
        <div className="flex items-center space-x-8 relative z-10">
          <a 
            href="/" 
            onClick={handleHomeClick}
            className="relative h-8 w-8 hover:scale-110 transition-transform duration-300 mr-4"
          >
            <Image
              src={davidsonLogo}
              alt="Davidson Lab"
              fill
              className="object-contain"
              priority
            />
          </a>
          <a
            href="/"
            onClick={handleHomeClick}
            className={`${
              isActive('/') 
                ? 'gradient-text' 
                : 'text-gray-700 hover:text-gray-900'
            } font-medium text-base tracking-wide transition-all duration-300 hover:scale-105`}
          >
            About
          </a>
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
          className="relative h-12 w-36 hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={sunnybrookLogo}
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
