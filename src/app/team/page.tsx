'use client'

import TeamMember from '@/components/team/TeamMember'
import { teamMembers, getTeamByCategory } from '@/data/teamMembers'
import Footer from '@/components/layout/Footer'
import { useEffect, useState } from 'react'

export default function Team() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  
  const leadership = getTeamByCategory('leadership')
  const researchers = getTeamByCategory('researchers')
  const staff = getTeamByCategory('staff')

  useEffect(() => {
    // Clear any hash in the URL that might cause auto-scroll
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    
    // Scroll to top of page
    window.scrollTo(0, 0)
    
    setMounted(true)
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-arial-nova font-bold leading-tight text-center mb-16 transition-all duration-1000 ${
          mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="gradient-text-grey">Team</span>
        </h1>
        
        {/* Leadership Section - Benjamin Davidson Special Layout */}
        <section className={`mb-20 transition-all duration-1000 delay-200 ${
          mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {leadership.map((member, index) => {
            if (member.id === 'benjamin-davidson') {
              return (
                <div
                  key={member.id}
                  className={`flex flex-col lg:flex-row lg:items-center mb-16 transition-all duration-700 ${
                    mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={mounted && visible ? { transitionDelay: `${300 + index * 100}ms` } : {}}
                >
                  {/* Benjamin's Photo */}
                  <div className="flex-shrink-0 w-80 max-w-full">
                    <TeamMember
                      name={member.name}
                      title={member.title}
                      imageUrl={member.imageUrl}
                      bio="" // Remove hover bio for this special layout
                      linkedIn={member.linkedIn}
                      github={member.github}
                      orcid={member.orcid}
                    />
                  </div>
                  
                  {/* Benjamin's Bio Text */}
                  <div className="space-y-4 flex-1 mt-8 lg:mt-0 lg:ml-12">
                    <div className="prose prose-lg text-gray-700 leading-relaxed">
                      <p className="text-justify">{member.bio}</p>
                    </div>
                    
                    {/* Education Section */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-arial-nova font-semibold text-gray-900">Education</h3>
                      <ul className="space-y-0.5 text-gray-700 list-disc list-inside">
                        <li>BSc in Neuroscience, 2011, University of Toronto, Canada</li>
                        <li>MD, 2015, University of Western Ontario</li>
                        <li>PhD, 2021, University of Toronto</li>
                        <li>Residency in Neurosurgery, 2015-2023, University of Toronto</li>
                        <li>Fellowship in Stereotactic and Functional Neurosurgery, 2023-2024, University of Toronto</li>
                      </ul>
                    </div>
                    
                    {/* Appointments & Affiliations Section */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-arial-nova font-semibold text-gray-900">Appointments & Affiliations</h3>
                      <ul className="space-y-0.5 text-gray-700 list-disc list-inside">
                        <li>Scientist, Physical Sciences, Sunnybrook Research Institute</li>
                        <li>Assistant Professor, Department of Surgery, University of Toronto</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div
                  key={member.id}
                  className={`transition-all duration-700 ${
                    mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={mounted && visible ? { transitionDelay: `${300 + index * 100}ms` } : {}}
                >
                  <TeamMember
                    name={member.name}
                    title={member.title}
                    imageUrl={member.imageUrl}
                    bio={member.bio}
                    linkedIn={member.linkedIn}
                    github={member.github}
                    orcid={member.orcid}
                  />
                </div>
              )
            }
          })}
        </section>

        {/* Researchers Section */}
        <section className={`mb-20 transition-all duration-1000 delay-500 ${
          mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl font-arial-nova-thin mb-10">Researchers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {researchers.map((member, index) => (
              <div
                key={member.id}
                className={`transition-all duration-700 ${
                  mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={mounted && visible ? { transitionDelay: `${600 + index * 100}ms` } : {}}
              >
                <TeamMember
                  name={member.name}
                  title={member.title}
                  imageUrl={member.imageUrl}
                  bio={member.bio}
                  linkedIn={member.linkedIn}
                  github={member.github}
                  orcid={member.orcid}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Staff Section */}
        <section className={`mb-20 transition-all duration-1000 delay-700 ${
          mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl font-arial-nova-thin mb-10">Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {staff.map((member, index) => (
              <div
                key={member.id}
                className={`transition-all duration-700 ${
                  mounted && visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={mounted && visible ? { transitionDelay: `${800 + index * 100}ms` } : {}}
              >
                <TeamMember
                  name={member.name}
                  title={member.title}
                  imageUrl={member.imageUrl}
                  bio={member.bio}
                  linkedIn={member.linkedIn}
                  github={member.github}
                  orcid={member.orcid}
                />
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}