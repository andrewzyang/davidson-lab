'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, DocumentTextIcon, LinkIcon } from '@heroicons/react/24/outline'

interface Publication {
  id: string
  title: string
  authors: string[]
  year: number
  month: string
  type: string
  journal: string
  fullTextAvailable?: boolean
  abstract?: string
  keywords?: string[]
  researchGateUrl?: string
  pubmedUrl?: string
  doi?: string
}

interface PublicationCardProps {
  publication: Publication
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatAuthors = (authors: string[]) => {
    if (authors.length > 3) {
      return `${authors.slice(0, 3).join(', ')}, et al.`
    }
    return authors.join(', ')
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'article':
        return 'bg-blue-500/10 text-blue-600 border-blue-200'
      case 'chapter':
        return 'bg-purple-500/10 text-purple-600 border-purple-200'
      case 'preprint':
        return 'bg-orange-500/10 text-orange-600 border-orange-200'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200'
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group">
      {/* Header with Type and Date */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(publication.type)}`}>
            {publication.type}
          </span>
          <span className="text-sm text-gray-500">
            {publication.month} {publication.year}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
        {publication.title}
      </h3>

      {/* Authors */}
      <p className="text-sm text-gray-600 mb-2">
        {formatAuthors(publication.authors)}
      </p>

      {/* Journal */}
      {publication.journal && (
        <p className="text-sm text-blue-600 italic mb-4">
          {publication.journal}
        </p>
      )}

      {/* Expandable Content */}
      {publication.abstract && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors mb-3"
          >
            {isExpanded ? (
              <>
                <ChevronUpIcon className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-4 h-4" />
                Abstract
              </>
            )}
          </button>

          {isExpanded && (
            <div className="space-y-4 animate-fadeIn">
              {/* Abstract */}
              {publication.abstract && (
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {publication.abstract}
                  </p>
                </div>
              )}

            </div>
          )}
        </div>
      )}

    </div>
  )
}