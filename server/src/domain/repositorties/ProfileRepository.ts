import { Profile } from '../entities/Profile'

export type ProfileRepository = {
  getByUserId: (userId: string) => Promise<Profile | null>
  getById: (id: string) => Promise<Profile | null>
  save: (profile: Profile) => Promise<void>
  delete: (profileId: Profile) => Promise<void>
}
