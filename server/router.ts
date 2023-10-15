import { Router, Request, Response } from 'express'
import { sharedErrorHandler, withErrorHandling } from './src/infrastructure/shared/Errors'
import {
  getProfile,
  getProfileById,
  loginUserController,
  putUserProfileController,
  registerUserController,
} from './src/infrastructure/controllers'

const router = Router()

router.post('/api/register', withErrorHandling(registerUserController, sharedErrorHandler))

router.post('/api/login', withErrorHandling(loginUserController, sharedErrorHandler))
router.get('/api/status', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'logged in',
  })
})

router.put('/api/profile', withErrorHandling(putUserProfileController, sharedErrorHandler))

router.get('/api/profile', withErrorHandling(getProfile, sharedErrorHandler))

router.get('/api/public/profile/:profileId', withErrorHandling(getProfileById, sharedErrorHandler))

router.get('/api/test', (req: Request, res: Response) => {
  res.json('test')
})
export default router
