export interface Link {
  platform: string
  link: string
}
export interface Profile {
  id: string
  userId: string
  firstName: string
  lastName: string
  email?: string
  links: Link[]
  base64ProfileImage: string
  createdAt: Date
  updatedAt: Date
}
