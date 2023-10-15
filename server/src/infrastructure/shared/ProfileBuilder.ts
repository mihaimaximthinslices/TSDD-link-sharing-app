import { faker } from '@faker-js/faker'
import { Profile } from '../../domain/entities'

export const profileBuilder = {
  build: (partialProfile?: Partial<Profile>) => {
    let newProfile: Profile = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      base64ProfileImage: 'base64ProfileImage',
      email: faker.internet.email(),
      firstName: faker.internet.userName(),
      lastName: faker.internet.userName(),
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (partialProfile) {
      newProfile = {
        ...newProfile,
        ...partialProfile,
      }
    }
    return newProfile
  },
  buildMany: (count: number, partialProfile?: Partial<Profile>) => {
    const profiles: Profile[] = []
    for (let i = 0; i < count; i++) {
      let newProfile: Profile = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        base64ProfileImage: 'base64ProfileImage',
        email: faker.internet.email(),
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        links: [
          { platform: 'github', link: 'https://www.github.com/benwright' },
          { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      if (partialProfile) {
        newProfile = {
          ...newProfile,
          ...partialProfile,
        }
      }
      profiles.push(newProfile)
    }
    return profiles
  },
}
