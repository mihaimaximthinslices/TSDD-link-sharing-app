import { Request, Response } from 'express'
import z from 'zod'
import { prismaUserRepository } from '../repositories/PrismaUserRepository'
import { createUserUsecase } from '../../domain/usecases/createUserUsecase'
import { hashMethods, dateGenerator, uuidGenerator } from '../shared/'
import jwt from 'jsonwebtoken'
import { fa } from '@faker-js/faker'

const userSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export async function registerUserController(req: Request, res: Response) {
  const { email, password } = userSchema.parse(req.body)

  const hashedPassword = await hashMethods.hash(password)

  const usecase = createUserUsecase({
    userRepository: prismaUserRepository,
    dateGenerator: dateGenerator,
    uuidGenerator: uuidGenerator,
  })

  const { id } = await usecase({
    email: email,
    password: hashedPassword,
  })

  const expireDate = new Date()
  expireDate.setHours(expireDate.getHours() + 1)

  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, { algorithm: 'HS256', expiresIn: '1h' })

  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
    expires: expireDate,
    sameSite: 'lax',
    path: '/',
  })
  res.status(201).json({
    token,
    message: 'Registration successful. Welcome to our platform!',
  })
}
