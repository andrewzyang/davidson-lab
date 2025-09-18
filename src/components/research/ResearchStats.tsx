'use client'

import { useEffect, useState } from 'react'

interface ResearchStatsProps {
  totalPublications: number
  totalCitations: number
  totalReads: number
}

export default function ResearchStats({ totalPublications, totalCitations, totalReads }: ResearchStatsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Format numbers consistently to avoid hydration mismatch
  const formatNumber = (num: number) => {
    if (!isClient) {
      return num.toString()
    }
    return num.toLocaleString()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {/* Publications */}
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 mb-2 font-arial-nova">
          {totalPublications}
        </div>
        <div className="text-sm text-gray-900 uppercase tracking-wider font-arial-nova">Publications</div>
      </div>

      {/* Citations */}
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 mb-2 font-arial-nova">
          {formatNumber(totalCitations)}
        </div>
        <div className="text-sm text-gray-900 uppercase tracking-wider font-arial-nova">Citations</div>
      </div>

      {/* Reads */}
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 mb-2 font-arial-nova">
          {formatNumber(totalReads)}
        </div>
        <div className="text-sm text-gray-900 uppercase tracking-wider font-arial-nova">Reads</div>
      </div>
    </div>
  )
}