import express from 'express'
import router from './router'
import bodyParser from 'body-parser'
import { expressjwt } from 'express-jwt'
const app = express()
import cors from 'cors'
import cookies from 'cookie-parser'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookies())

if (process.env.ENV === 'DEV') {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  )
} else {
  app.use(
    cors({
      origin: 'https://tsdd-link-sharing-app-fe.vercel.app',
      credentials: true,
    }),
  )
}

app.use(
  expressjwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
    credentialsRequired: true,
    getToken: (req: express.Request) => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token
      }
      return
    },
  }).unless({ path: ['/login', '/register'] }),
)

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      message: 'Unauthorized',
    })
  } else {
    next(err)
  }
})

app.use(router)

export default app
