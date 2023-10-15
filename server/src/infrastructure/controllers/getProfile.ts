import { Response } from 'express'
import { prismaProfileRepository } from '../repositories'
import { EntityNotFoundError } from '../../domain/types/Errors'
import { Request as JWTRequest } from 'express-jwt'

export async function getProfile(req: JWTRequest, res: Response) {
  const profile = await prismaProfileRepository.getByUserId(req.auth!.userId)

  if (!profile) {
    throw new EntityNotFoundError('Profile')
  }

  res.status(200).json({
    profile,
  })
}
