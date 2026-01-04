export interface Profile {
  name: string
  email: string
  profile: {
    phone: string
    location: string
    skills: string[]
    experience: string
  }
  resumeFileId?: string
}
