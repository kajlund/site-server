import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import log from '../logger.js'
import { UnauthorizedError } from '../errors.js'

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10)
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

export const comparePasswords = async (pwd1, pwd2) => {
  const result = await bcrypt.compare(pwd1, pwd2)
  return result
}

export const encryptPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const password = await bcrypt.hash(pwd, salt)
  return password
}

export const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  })
  return token
}

export const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_WEEK),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
}

export const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (err) {
    log.error(err)
    throw new UnauthorizedError()
  }
}

export default {
  comparePasswords,
  encryptPassword,
  generateToken,
  setAuthCookie,
  verifyToken,
}
