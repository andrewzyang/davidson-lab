'use client'

import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface PublicationFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedYear: number | null
  onYearChange: (year: number | null) => void
  selectedType: string
  onTypeChange: (type: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  years: number[]
  types: string[]
  totalCount: number
  filteredCount: number
}

export default function PublicationFilters({
  searchTerm,
  onSearchChange,
  selectedYear,
  onYearChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  years,
  types,
  totalCount,
  filteredCount,
}: PublicationFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const clearFilters = () => {
    onSearchChange('')
    onYearChange(null)
    onTypeChange('all')
  }

  const hasActiveFilters = searchTerm || selectedYear || selectedType !== 'all'

  return (
    <>
      {/* Search Bar */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search publications, authors, keywords..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex gap-4 mb-6">
        {/* Year Filter */}
        <select
          value={selectedYear || ''}
          onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : null)}
          className="glass px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="glass px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="all">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="glass px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="date">Latest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear Filters
          </button>
        )}

        {/* Results Count */}
        <div className="ml-auto flex items-center text-sm text-gray-600">
          Showing <span className="font-semibold mx-1">{filteredCount}</span> 
          of <span className="font-semibold mx-1">{totalCount}</span> publications
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          <FunnelIcon className="w-4 h-4" />
          Filters
        </button>
        
        {/* Results Count Mobile */}
        <div className="mt-3 text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredCount}</span> of{' '}
          <span className="font-semibold">{totalCount}</span> publications
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 space-y-4 animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={selectedYear || ''}
                onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Mobile Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Mobile Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="date">Latest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>

            {/* Mobile Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  clearFilters()
                  setShowMobileFilters(false)
                }}
                className="flex-1 py-3 bg-gray-100 rounded-lg font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}