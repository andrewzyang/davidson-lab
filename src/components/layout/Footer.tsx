'use client'
import ContactForm from './ContactForm'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white snap-section">
      <div className="flex-1 flex flex-col px-6 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center gradient-text-grey">Get in Touch</h2>
          <ContactForm />
          
          {/* Logos and Copyright Section */}
          <div className="mt-6 md:mt-8 pt-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 mb-2">
              <div className="relative h-8 md:h-10 w-32 md:w-36">
                <div className="absolute inset-0 bg-gray-500" 
                     style={{
                       maskImage: "url('/logo-sunnybrook.svg')",
                       maskSize: 'contain',
                       maskRepeat: 'no-repeat',
                       maskPosition: 'center',
                       WebkitMaskImage: "url('/logo-sunnybrook.svg')",
                       WebkitMaskSize: 'contain',
                       WebkitMaskRepeat: 'no-repeat',
                       WebkitMaskPosition: 'center'
                     }} />
              </div>
              <div className="relative h-8 md:h-10 w-32 md:w-36">
                <div className="absolute inset-0 bg-gray-500"
                     style={{
                       maskImage: "url('/logo-uoft.svg')",
                       maskSize: 'contain',
                       maskRepeat: 'no-repeat',
                       maskPosition: 'center',
                       WebkitMaskImage: "url('/logo-uoft.svg')",
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