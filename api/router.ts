import { Router, Request, Response } from 'express'
import {sharedErrorHandler, withErrorHandling} from "./src/infrastructure/shared/Errors";
import {loginUserController, registerUserController} from "./src/infrastructure/controllers";
const router = Router()

router.post('/api/register', withErrorHandling(registerUserController, sharedErrorHandler))

router.post('/api/login', withErrorHandling(loginUserController, sharedErrorHandler))
router.get('/status', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'logged in',
  })
})

router.get('/test', (req: Request, res: Response) => {
  res.json('test')
})
export default router
