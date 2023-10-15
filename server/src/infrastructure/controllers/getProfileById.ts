import { Request, Response } from 'express'
import { prismaProfileRepository } from '../repositories'
import { EntityNotFoundError } from '../../domain/types/Errors'

export async function getProfileById(req: Request, res: Response) {
  const { profileId } = req.params

  const profile = await prismaProfileRepository.getById(profileId!)

  if (!profile) {
    throw new EntityNotFoundError('Profile', profileId)
  }

  res.status(200).json({
    profile,
  })
}
