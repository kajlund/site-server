import { UnauthorizedError } from '../errors.js'
import authUtil from '../utils/auth.js'
import svcUser from '../api/users/user.service.js'
import log from '../logger.js'

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next()
  next(new UnauthorizedError())
}

export const auth = async (req, res, next) => {
  const token = req.signedCookies.token
  if (!token) {
    throw new UnauthorizedError()
  }

  try {
    const decoded = authUtil.verifyToken(token)
    req.user = await svcUser.findUserById(decoded.id)
    if (!req.user) return next(new UnauthorizedError())
    next()
  } catch (err) {
    log.error(err)
    next(new UnauthorizedError())
  }
}

export const user = (req, res, next) => {
  if (req.user && (req.user.role === 'user' || req.user.role === 'admin')) return next()
  next(new UnauthorizedError())
}

export default {
  admin,
  auth,
  user,
}
