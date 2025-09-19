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
  
  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    // Check if we're on the home page (which has a custom scroll container)
    if (pathname === '/') {
      // Home page: Has 3 full-screen sections (hero, about, contact)
      // Each section is exactly viewport height with snap scrolling
      const scrollToContact = () => {
        const footerElement = document.getElementById('contact')
        
        if (!footerElement) {
          console.error('Contact section not found')
          return
        }
        
        // Method 1: Direct scrollIntoView (most reliable)
        footerElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest' 
        })
        
        // Method 2: Calculate exact position as fallback
        // The footer is the 3rd section, so it's at 2 * viewport height
        const viewportHeight = window.innerHeight
        const targetScroll = viewportHeight * 2 // 0 for hero, 1x for about, 2x for contact
        
        // Find any scrollable container (could be body, html, or the main div)
        const possibleContainers = [
          document.querySelector('.snap-y.snap-mandatory') as HTMLElement,
          document.querySelector('.overflow-y-auto') as HTMLElement,
          document.querySelector('main') as HTMLElement,
          document.documentElement,
          document.body
        ].filter(Boolean)
        
        // Try to scroll each possible container
        setTimeout(() => {
          possibleContainers.forEach(container => {
            if (container && container.scrollHeight > container.clientHeight) {
              // This container is scrollable
              console.log('Scrolling container:', container.className || container.tagName)
              
              // Try direct position scroll
              if ('scrollTo' in container) {
                container.scrollTo({
                  top: targetScroll,
                  behavior: 'smooth'
                })
              }
              
              // Also try setting scrollTop directly as backup
              setTimeout(() => {
                container.scrollTop = targetScroll
              }, 500)
            }
          })
          
          // Final fallback: window scroll
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          })
        }, 100)
      }
      
      // Execute immediately
      scrollToContact()
      
      // Retry to ensure it works
      setTimeout(scrollToContact, 200)
      
    } else {
      // Other pages: use window scroll (existing solution for team/research)
      const scrollToBottom = () => {
        // Get all possible height measurements
        const body = document.body
        const html = document.documentElement
        
        // Calculate the true document height
        const documentHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        )
        
        // Calculate viewport height
        const viewportHeight = Math.max(
          window.innerHeight,
          html.clientHeight
        )
        
        // Calculate the maximum scroll position
        const maxScrollPosition = documentHeight - viewportHeight
        
        console.log('Scrolling to bottom:', { documentHeight, viewportHeight, maxScrollPosition })
        
        // First attempt: Scroll to calculated maximum
        window.scrollTo({
          top: maxScrollPosition,
          behavior: 'smooth'
        })
        
        // Backup: After smooth scroll completes, ensure we're at absolute bottom
        setTimeout(() => {
          // Recalculate in case of dynamic content
          const finalDocHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          )
          const finalMaxScroll = finalDocHeight - window.innerHeight
          
          // Force scroll to absolute maximum if not there already
          if (window.scrollY < finalMaxScroll - 10) {
            window.scrollTo(0, finalMaxScroll)
          }
        }, 800)
      }
      
      // Execute immediately
      scrollToBottom()
      
      // Backup execution after short delay to handle any DOM updates
      setTimeout(scrollToBottom, 100)
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
          <button
            onClick={handleContactClick}
            className="px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-gray-500 to-gray-700 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Contact
          </button>
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
