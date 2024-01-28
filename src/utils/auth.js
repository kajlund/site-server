import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10)

const comparePasswords = async (pwd1, pwd2) => {
  const result = await bcrypt.compare(pwd1, pwd2)
  return result
}

const encryptPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const password = await bcrypt.hash(pwd, salt)
  return password
}

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  })
  return token
}

export default {
  comparePasswords,
  encryptPassword,
  generateToken,
}
