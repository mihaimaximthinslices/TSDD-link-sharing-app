import { UserRepository } from '../../repositorties/UserRepository'
import { UseCaseConstructor } from '../../types/UseCase'
import { User } from '../../entities/User'
import { UuidGenerator } from '../../types/UUIDGenerator'
import { DateGenerator } from '../../types/DateGenerator'
import { DuplicateEntityError } from '../../types/Errors'

type Params = {
  userRepository: UserRepository
  uuidGenerator: UuidGenerator
  dateGenerator: DateGenerator
}

type Request = {
  email: string
  password: string
}

export const createUserUsecase: UseCaseConstructor<Params, Request, User> = (params) => {
  const { userRepository, uuidGenerator, dateGenerator } = params

  return async (request) => {
    const { email, password } = request

    const id = uuidGenerator.next()
    const NOW = dateGenerator.now()

    const user = await userRepository.getByEmail(email)

    if (user) {
      throw new DuplicateEntityError(`User with email ${user.email}`)
    }

    const newUser: User = {
      id,
      email,
      password,
      createdAt: NOW,
      updatedAt: NOW,
    }

    await userRepository.save(newUser)

    return newUser
  }
}
