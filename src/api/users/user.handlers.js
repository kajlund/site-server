import { codes } from '../../statuscodes.js'
import { setAuthCookie } from '../../utils/auth.js'

import svcUser from './user.service.js'

export const login = async (req, res, next) => {
  try {
    const { token, user } = await svcUser.loginUser(res.locals.data)
    setAuthCookie(res, token)
    res.status(codes.OK).json({
      success: true,
      message: `Logged on user ${user.alias}`,
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

export const queryUsers = async (req, res, next) => {
  try {
    const users = await svcUser.queryUsers(res.locals.query)
    res.status(codes.OK).json({
      success: true,
      message: `Found ${users.length} users`,
      query: res.locals.query,
      data: users,
    })
  } catch (err) {
    next(err)
  }
}

export const register = async (req, res, next) => {
  try {
    const { token, user } = await svcUser.registerUser(res.locals.data)
    setAuthCookie(res, token)
    res.status(codes.OK).json({
      success: true,
      message: `Registered user ${user.alias}`,
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  login,
  queryUsers,
  register,
}
