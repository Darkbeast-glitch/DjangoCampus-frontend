export interface Workshop {
  id: number
  workshop_image_header?: string
  workshop_name: string
  workshop_date: string
  workshop_time?: string
  workshop_location: string
  is_ended: boolean
  registrations_count: string
  workshop_description: string  // Updated to match your API schema
  capacity?: number
  venue?: string
  is_active?: boolean
  requirements?: string[]
  what_included?: string[]
  created_at?: string
  updated_at?: string
}

export interface Registration {
  id?: number
  workshop: number
  workshop_name?: string
  workshop_date?: string
  workshop_time?: string
  user_name: string
  user_email: string
  phone_number: string
  country: string              // ← NEW FIELD
  will_attend_physical: boolean
  django_experience: 'Beginner' | 'Intermediate' | 'Advanced'  // Updated to match Django choices
  registration_date?: string
}

export interface CommunityMember {
  id: number
  name: string
  title: string
  bio: string
  image?: string
  testimonial: string
  social_links?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface NewsletterSubscription {
  email: string
  name?: string
}

export interface TeamMember {
  id: number
  fullName: string
  position: string
  bio: string
  image: string
  image_url: string
  is_active: boolean
  join_date: string
  socials: TeamMemberSocial[]
}

export interface TeamMemberSocial {
  id: number
  platform: string
  url: string
  is_primary: boolean
}

export interface ApiResponse<T> {
  count?: number
  next?: string
  previous?: string
  results?: T[]
  data?: T
  message?: string
}