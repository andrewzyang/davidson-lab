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
      // Home page: scroll the main container with snap classes
      const scrollHomeToBottom = () => {
        // Find the main container with snap scrolling
        const snapContainer = document.querySelector('.snap-y.snap-mandatory') as HTMLElement
        const footerElement = document.getElementById('contact')
        
        if (snapContainer && footerElement) {
          // Get the footer's position relative to the container
          const footerRect = footerElement.getBoundingClientRect()
          const containerRect = snapContainer.getBoundingClientRect()
          
          // Calculate the scroll position needed to show the footer
          // We want the footer to fill the entire viewport
          const currentScroll = snapContainer.scrollTop
          const footerOffsetFromTop = footerElement.offsetTop
          
          console.log('Home page Footer scroll:', { 
            footerOffsetFromTop,
            currentScroll,
            footerRect,
            containerRect
          })
          
          // Temporarily disable snap behavior for smooth scrolling
          const originalSnapType = snapContainer.style.scrollSnapType
          snapContainer.style.scrollSnapType = 'none'
          
          // Scroll directly to the footer's position
          snapContainer.scrollTo({
            top: footerOffsetFromTop,
            behavior: 'smooth'
          })
          
          // Re-enable snap after scroll completes
          setTimeout(() => {
            // Ensure we're at the exact footer position
            snapContainer.scrollTo({
              top: footerOffsetFromTop,
              behavior: 'auto'
            })
            
            // Restore snap behavior
            snapContainer.style.scrollSnapType = originalSnapType
          }, 800)
        } else {
          // Fallback: use standard scrollIntoView
          const footerElement = document.getElementById('contact')
          if (footerElement) {
            footerElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
      
      scrollHomeToBottom()
      // Retry after short delay to ensure DOM is ready
      setTimeout(scrollHomeToBottom, 100)
      
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
