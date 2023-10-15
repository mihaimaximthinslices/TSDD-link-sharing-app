import { ProfileRepository } from '../../domain/repositorties'
import { Link, Profile, User } from '../../domain/entities'

import { PrismaClient, Profile as PrismaProfile } from '@prisma/client'
const prisma = new PrismaClient()

export const prismaProfileRepository: ProfileRepository = {
  getByUserId: async (userId: string): Promise<Profile | null> => {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
    })

    if (!profile) return null

    return rowToEntity(profile)
  },

  getById: async (id: string): Promise<Profile | null> => {
    const profile = await prisma.profile.findFirst({
      where: {
        id: id,
      },
    })

    if (!profile) return null

    return rowToEntity(profile)
  },

  async save(profile: Profile): Promise<void> {
    const profileRow = entityToRow(profile)

    const { id, ...profileData } = profileRow

    await prisma.profile.upsert({
      where: { id },
      update: profileData,
      create: {
        id,
        ...profileData,
      },
    })
  },

  async delete(profileId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: profileId },
    })
  },
}

const rowToEntity = (profile: PrismaProfile): Profile => {
  const links: Link[] = []
  profile.links.forEach((link) => {
    links.push(JSON.parse(link))
  })

  const profileEntity = {
    ...profile,
    email: profile.email ?? undefined,
    base64ProfileImage: profile.base64ProfileImage ?? undefined,
    links: links,
  }

  return profileEntity
}

const entityToRow = (profile: Profile): PrismaProfile => {
  const links = profile.links.map((link) => JSON.stringify(link))

  const profileEntity = {
    ...profile,
    links: links,
    email: profile.email ?? null,
    base64ProfileImage: profile.base64ProfileImage ?? null,
  }

  return profileEntity
}
