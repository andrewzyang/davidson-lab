'use client'

import PublicationCard from '@/components/research/PublicationCard'
import publicationsData from '@/data/publications.json'
import { useEffect, useState } from 'react'

// Helper function to convert month names to numbers for sorting
const getMonthValue = (month: string) => {
  const months: { [key: string]: number } = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  }
  return months[month] || 0
}

export default function Research() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  
  const { researcher, publications } = publicationsData

  // Sort publications by date (newest first)
  const sortedPublications = [...publications].sort((a, b) => {
    return b.year - a.year || getMonthValue(b.month) - getMonthValue(a.month)
  })

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-arial-nova font-bold leading-tight text-center mb-16 transition-all duration-1000 ${
          mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="gradient-text-grey">Research</span>
        </h1>

        {/* Publications List - Single Column */}
        <div className={`space-y-6 w-4/5 mx-auto transition-all duration-1000 delay-300 ${
          mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {sortedPublications.map((publication, index) => (
            <div
              key={publication.id}
              className={`transition-all duration-700 ${
                mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={mounted && visible ? { transitionDelay: `${400 + index * 150}ms` } : {}}
            >
              <PublicationCard
                publication={publication}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}