import { verify } from 'jsonwebtoken'

export default async (req, res, next) => {
  const bearerToken =
    req.get('Authorization') &&
    req.get('Authorization').split(' ')[0] === 'Bearer' &&
    req.get('Authorization').split(' ')[1]

  const token = req.body.token || req.query.token || bearerToken

  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'No token provided.',
    })
  }

  try {
    let decodedJwt = verify(token, process.env.JWT_SECRET)
    res.locals.userId = decodedJwt.userId
  } catch (e) {
    let message = ''
    switch (e.name) {
      case 'TokenExpiredError':
        message = 'The token is not valid anymore.'
        break

      case 'JsonWebTokenError':
        message = 'The token is invalid / malformed.'
        break

      default:
        message = 'Unknown token error.'
        break
    }

    return res.status(401).json({
      error: true,
      message,
    })
  }

  next()
}
