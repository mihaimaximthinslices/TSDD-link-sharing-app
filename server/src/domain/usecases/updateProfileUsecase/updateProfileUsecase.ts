import { UuidGenerator } from '../../types/UUIDGenerator'
import { DateGenerator } from '../../types/DateGenerator'
import { UseCaseConstructor } from '../../types/UseCase'
import { EntityNotFoundError, InvalidInputError } from '../../types/Errors'
import { ProfileRepository, UserRepository } from '../../repositorties'
import { Link, Profile } from '../../entities'

type Params = {
  userRepository: UserRepository
  profileRepository: ProfileRepository
  uuidGenerator: UuidGenerator
  dateGenerator: DateGenerator
}

type Request = {
  userId: string
  firstName: string
  lastName: string
  email?: string
  links: Link[]
  base64ProfileImage?: string
}

const availablePlatforms = [
  'github',
  'frontendmentor',
  'twitter',
  'linkedin',
  'youtube',
  'facebook',
  'twitch',
  'devto',
  'codewars',
  'codepen',
  'freecodecamp',
  'gitlab',
  'hashnode',
  'stackoverflow',
]

export const updateProfileUsecase: UseCaseConstructor<Params, Request, void> = (params) => {
  const { userRepository, uuidGenerator, dateGenerator, profileRepository } = params

  return async (request) => {
    const { userId, firstName, lastName, email, links, base64ProfileImage } = request

    await getUser(userId)

    await validatePlatforms(links)

    const profile = await profileRepository.getByUserId(userId)

    const now = dateGenerator.now()

    const newData: Partial<Profile> = {
      updatedAt: now,
      firstName,
      lastName,
      links,
    }

    if (email) {
      newData.email = email
    }

    if (base64ProfileImage) {
      newData.base64ProfileImage = base64ProfileImage
    }

    if (!profile) {
      newData.userId = userId
      newData.id = uuidGenerator.next()
      newData.createdAt = now
    }

    await profileRepository.save({ ...profile, ...newData } as Profile)
  }

  async function getUser(id: string) {
    const user = await userRepository.getById(id)
    if (!user) {
      throw new EntityNotFoundError('User', id)
    }

    return user
  }

  async function validatePlatforms(links: Link[]) {
    const hasInvalidPlatform = links.some((link) => {
      return !availablePlatforms.includes(link.platform)
    })

    if (hasInvalidPlatform) {
      throw new InvalidInputError('Invalid platform')
    }
  }
}
