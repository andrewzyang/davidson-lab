'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', data)
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    reset()
    
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <div className="relative">
      {/* Glass card container */}
      <div className="relative backdrop-blur-xl bg-white/70 rounded-2xl p-6 md:p-8 border border-white/30 shadow-xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-white/20 pointer-events-none" />
        
        <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 px-2">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 px-2">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              {...register('subject')}
              type="text"
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-transparent transition-all duration-300 placeholder-gray-400"
              placeholder="How can we help?"
            />
            {errors.subject && (
              <p className="text-sm text-red-600 px-2">{errors.subject.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              {...register('message')}
              rows={3}
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none"
              placeholder="Tell us more about your inquiry..."
            />
            {errors.message && (
              <p className="text-sm text-red-600 px-2">{errors.message.message}</p>
            )}
          </div>
          
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 text-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
          
          {submitSuccess && (
            <div className="mt-4 p-3 backdrop-blur-sm bg-green-50/80 border border-green-200/50 text-green-700 rounded-xl text-center">
              <p className="font-medium">Thank you for your message!</p>
              <p className="text-sm mt-1">We'll get back to you soon.</p>
            </div>
          )}
        </form>
      </div>
      
      {/* Background blur effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-3xl blur-3xl -z-10" />
    </div>
  )
}