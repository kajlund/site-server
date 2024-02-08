import { codes } from '../../statuscodes.js'
import { clearAuthCookie, setAuthCookie } from '../../utils/auth.js'

import svcUser from './user.service.js'

export const findUserByID = async (req, res, next) => {
  try {
    const user = await svcUser.findById(res.locals.id)
    res.status(codes.OK).json({
      success: true,
      message: `Found user ${user.alias}`,
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

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

export const logout = async (req, res, next) => {
  try {
    const user = req.user
    // Just trash the cookie for now,
    // Implement proper blacklisting later
    clearAuthCookie(res)
    res.status(codes.OK).json({
      success: true,
      message: `Logged out user ${user.alias}`,
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

export const profile = async (req, res, next) => {
  try {
    const user = await svcUser.findById(req.user.id)
    res.status(codes.OK).json({
      success: true,
      message: `Found profile for ${user.alias}`,
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
  logout,
  queryUsers,
  register,
}
