import { getAssetPath } from '@/utils/basePath'

export interface TeamMember {
  id: string
  name: string
  title: string
  imageUrl: string
  category: 'leadership' | 'researchers' | 'staff'
  bio?: string
  email?: string
  linkedIn?: string
  github?: string
  orcid?: string
  googleScholar?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 'benjamin-davidson',
    name: 'Dr. Benjamin Davidson, MD, PhD',
    title: 'Neurosurgeon & Principal Investigator',
    imageUrl: getAssetPath('/images/team/benjamin-davidson.webp'),
    category: 'leadership',
    bio: 'Benjamin Davidson (MD, PhD) is a functional neurosurgeon starting on staff at Sunnybrook Hospital, Toronto. His interests include lesional and DBS treatment of movement disorders, pain, and psychiatric disease, and the use of advanced neuroimaging to help uncover predictors, biomarkers, and mechanisms of response. He has published extensively on MRgFUS capsulotomy in MDD and OCD, as well as the use of DBS to treatment alcohol use disorder. He\'s keen to discuss ways to improve how we select patients, measure outcomes, and interrogate neurocircuits.',
    email: 'davidson@university.edu',
    linkedIn: 'https://www.linkedin.com/in/benjamin-davidson',
    github: 'https://github.com/bendavidson',
    orcid: 'https://orcid.org/0000-0000-0000-0000'
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Senior Research Scientist',
    imageUrl: getAssetPath('/images/team/sarah-chen.jpg'),
    category: 'researchers',
    bio: 'Dr. Sarah Chen specializes in computational neuroscience and machine learning applications.'
  },
  {
    id: 'michael-torres',
    name: 'Michael Torres',
    title: 'Postdoctoral Fellow',
    imageUrl: getAssetPath('/images/team/michael-torres.jpg'),
    category: 'researchers',
    bio: 'Michael Torres focuses on neural network modeling and data analysis.'
  },
  {
    id: 'emily-williams',
    name: 'Emily Williams',
    title: 'Graduate Student',
    imageUrl: getAssetPath('/images/team/emily-williams.jpg'),
    category: 'researchers',
    bio: 'Emily Williams is pursuing her PhD in neuroscience with a focus on cognitive processes.'
  },
  {
    id: 'james-park',
    name: 'James Park',
    title: 'Research Assistant',
    imageUrl: getAssetPath('/images/team/james-park.jpg'),
    category: 'staff',
    bio: 'James Park supports various research projects and laboratory operations.'
  },
  {
    id: 'lisa-johnson',
    name: 'Lisa Johnson',
    title: 'Lab Manager',
    imageUrl: getAssetPath('/images/team/lisa-johnson.jpg'),
    category: 'staff',
    bio: 'Lisa Johnson manages laboratory operations and coordinates research activities.'
  }
]

export const getTeamByCategory = (category: TeamMember['category']) => {
  return teamMembers.filter(member => member.category === category)
}

export const getTeamMember = (id: string) => {
  return teamMembers.find(member => member.id === id)
}