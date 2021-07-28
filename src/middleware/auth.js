import { verify } from 'jsonwebtoken'
import User from '../models/User'

export default async function authMiddleware(req, res, next) {
  const bearerToken =
    req.get('Authorization') &&
    req.get('Authorization').split(' ')[0] === 'Bearer' &&
    req.get('Authorization').split(' ')[1]

  const token = req.body.token || req.query.token || bearerToken

  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'no token provided',
    })
  }

  try {
    let decodedJwt = verify(token, process.env.JWT_SECRET)
    res.locals.userId = decodedJwt.userId
    res.locals.user = await User.findOne({ _id: res.locals.userId })
  } catch (e) {
    let message = ''
    switch (e.name) {
      case 'TokenExpiredError':
        message = 'token expired'
        break

      case 'JsonWebTokenError':
        message = 'invalid token'
        break

      default:
        message = 'unknown token error.'
        break
    }

    return res.status(401).json({
      error: true,
      message,
    })
  }

  next()
}
