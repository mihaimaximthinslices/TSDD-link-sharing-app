import { Request, Response } from 'express'
import z from 'zod'
import { prismaUserRepository } from '../repositories/PrismaUserRepository'
import { hashMethods, dateGenerator, uuidGenerator } from '../shared/'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../../domain/types/Errors'

const userSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export async function loginUserController(req: Request, res: Response) {
  const { email, password } = userSchema.parse(req.body)

  const user = await prismaUserRepository.getByEmail(email)

  if (!user) {
    throw new UnauthorizedError('User')
  }

  const hashMatch = await hashMethods.compare(password, user.password)

  if (!hashMatch) {
    throw new UnauthorizedError('User')
  }

  const expireDate = new Date()
  expireDate.setHours(expireDate.getHours() + 1)

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { algorithm: 'HS256', expiresIn: '1h' })

  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
    expires: expireDate,
    sameSite: 'lax',
    path: '/',
  })

  res.status(200).json({
    token,
    message: 'Login successful!',
  })
}
