import { UserRepository } from '../../domain/repositorties/UserRepository'
import { User } from '../../domain/entities/User'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const prismaUserRepository: UserRepository = {
  async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    })
    return user
  },

  async getById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id },
    })

    return user
  },

  async save(user: User): Promise<void> {
    const { id, ...userData } = user

    // Use upsert to insert or update the user based on their ID
    await prisma.user.upsert({
      where: { id },
      update: userData,
      create: {
        id,
        ...userData,
      },
    })
  },

  async delete(user: User): Promise<void> {
    const { id } = user
    await prisma.user.delete({
      where: { id },
    })
  },
}
