import { Response } from 'express'
import z from 'zod'
import { prismaUserRepository } from '../repositories/PrismaUserRepository'
import { dateGenerator, uuidGenerator } from '../shared/'
import imageSize from 'image-size'
import { Request as JWTRequest } from 'express-jwt'
import { updateProfileUsecase } from '../../domain/usecases/updateProfileUsecase'
import { prismaProfileRepository } from '../repositories'

const LinkSchema = z.object({
  platform: z.string(),
  link: z.string().url(),
})

const isValidFirstName = (value: string) => /^[a-zA-Z\s\-]*$/.test(value)
const isValidLastName = isValidFirstName

const isValidBase64Image = (value: string) => {
  const base64Pattern = /^data:image\/(png|jpeg);base64,/

  if (!base64Pattern.test(value)) {
    return false
  }

  const matchResult = value.match(base64Pattern)

  if (matchResult) {
    const [, imageType] = matchResult
    const data = value.replace(base64Pattern, '')
    const buffer = Buffer.from(data, 'base64')

    try {
      const dimensions = imageSize(buffer)
      return (
        (imageType === 'png' || imageType === 'jpeg') &&
        dimensions.width &&
        dimensions.width <= 1024 &&
        dimensions.height &&
        dimensions.height <= 1024
      )
    } catch (error) {
      return false
    }
  }

  return false
}

const ProfileSchema = z.object({
  firstName: z
    .string()
    .max(50)
    .refine((value) => isValidFirstName(value), {
      message: 'First name can only contain letters, spaces, and hyphens.',
    }),
  email: z.string().email().optional(),
  lastName: z
    .string()
    .max(50)
    .refine((value) => isValidLastName(value), {
      message: 'Last name can only contain letters, spaces, and hyphens.',
    }),
  links: z.array(LinkSchema).min(1, 'At least one link is required'),
  base64ProfileImage: z
    .string()
    .optional()
    .refine((value) => !value || isValidBase64Image(value), {
      message:
        'Invalid base64 image format or dimensions. It should be a PNG or JPEG image with a maximum dimension of 1024x1024.',
    }),
})

export async function putUserProfileController(req: JWTRequest, res: Response) {
  const profileData = ProfileSchema.parse(req.body)

  const usecase = updateProfileUsecase({
    userRepository: prismaUserRepository,
    profileRepository: prismaProfileRepository,
    dateGenerator: dateGenerator,
    uuidGenerator: uuidGenerator,
  })

  await usecase({
    userId: req.auth?.userId,
    ...profileData,
  })

  res.status(200).json({
    message: 'Profile updated successfully',
  })
}
