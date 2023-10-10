import express from 'express'
import router from './router'
import 'dotenv/config'

import bodyParser from 'body-parser'
import { expressjwt } from 'express-jwt'
const app = express()
import cors from 'cors'
import cookies from 'cookie-parser'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookies())

app.use(
    cors({
      origin: process.env.HOST,
      credentials: true,
    }),
)

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
  }).unless({ path: ['/api/login', '/api/register'] }),
)

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log(err)
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
