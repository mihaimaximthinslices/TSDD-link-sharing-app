import { afterEach, vi, describe, expect, test, beforeEach } from 'vitest'
import { updateProfileUsecase } from './updateProfileUsecase'
import { mock } from 'vitest-mock-extended'
import { ProfileRepository, UserRepository } from '../../repositorties'
import { UuidGenerator } from '../../types/UUIDGenerator'
import { DateGenerator } from '../../types/DateGenerator'
import { EntityNotFoundError, InvalidInputError } from '../../types/Errors'
import { userBuilder } from '../../../infrastructure/shared/UserBuilder'
import { profileBuilder } from '../../../infrastructure/shared/ProfileBuilder'

describe('updateProfileUsecase', () => {
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

  const now = new Date()
  const userId = 'userid'
  const newProfileId = 'newProfileId'
  const email = 'mihai.maxim@thinslices.com'
  const firstName = 'John'
  const lastName = 'Doe'
  const links = availablePlatforms.map((platform) => ({
    platform,
    link: `https://www.${platform}.com/johndoe`,
  }))
  const base64ProfileImage = 'base64ProfileImage'

  const request = {
    userId,
    email,
    firstName,
    lastName,
    links,
    base64ProfileImage,
  }

  const userRepository = mock<UserRepository>()

  const profileRepository = mock<ProfileRepository>()

  const uuidGenerator = mock<UuidGenerator>()

  const dateGenerator = mock<DateGenerator>()

  const usecase = updateProfileUsecase({
    userRepository,
    profileRepository,
    uuidGenerator,
    dateGenerator,
  })
  const runningTheUsecase = async () => usecase(request)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('given the user does not exist', () => {
    beforeEach(() => {
      userRepository.getById.mockResolvedValue(null)
    })
    test('should throw EntityNotFoundError', async () => {
      await expect(runningTheUsecase).rejects.toThrow(EntityNotFoundError)
      expect(userRepository.getById).toHaveBeenCalledWith(userId)
    })
  })
  describe('given the user exists', () => {
    const user = userBuilder.build({
      id: userId,
    })
    beforeEach(() => {
      userRepository.getById.mockResolvedValue(user)
    })

    describe('given there are platforms that are not supported', () => {
      beforeEach(() => {
        request.links[0].platform = 'unsupported'
      })
      test('should throw InvalidInputError', async () => {
        await expect(runningTheUsecase).rejects.toThrow(InvalidInputError)
      })

      afterEach(() => {
        request.links[0].platform = 'github'
      })
    })

    describe('given there are no platforms that are not supported', () => {
      beforeEach(() => {
        dateGenerator.now.mockReturnValue(now)
      })

      describe('given there are duplicate platforms', () => {
        beforeEach(() => {
          request.links[0].platform = request.links[1].platform
        })
        test('should throw InvalidInputError', async () => {
          await expect(runningTheUsecase).rejects.toThrow(InvalidInputError)
        })
        afterEach(() => {
          request.links[0].platform = 'github'
        })
      })

      describe('given there are no repeating platforms', () => {
        describe('given the profile already exists', () => {
          const profile = profileBuilder.build({
            id: 'profileId',
            userId,
          })
          beforeEach(() => {
            profileRepository.getByUserId.mockResolvedValue(profile)
          })

          test('should update the profile', async () => {
            await runningTheUsecase()

            expect(profileRepository.save).toHaveBeenCalledWith({
              ...profile,
              email,
              firstName,
              lastName,
              links,
              base64ProfileImage,
              updatedAt: now,
            })

            expect(profileRepository.getByUserId).toBeCalledTimes(1)
            expect(profileRepository.getByUserId).toBeCalledWith(userId)
          })
        })

        describe('given the profile does not exist', () => {
          beforeEach(() => {
            profileRepository.getByUserId.mockResolvedValue(null)
            uuidGenerator.next.mockReturnValue(newProfileId)
          })
          test('should create the profile', async () => {
            await runningTheUsecase()

            expect(profileRepository.save).toHaveBeenCalledWith({
              id: newProfileId,
              userId: userId,
              email,
              firstName,
              lastName,
              links,
              base64ProfileImage,
              createdAt: now,
              updatedAt: now,
            })
            expect(profileRepository.getByUserId).toBeCalledTimes(1)
            expect(profileRepository.getByUserId).toBeCalledWith(userId)
          })
        })
      })
    })
  })
})
