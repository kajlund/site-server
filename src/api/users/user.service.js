import auth from '../../utils/auth.js'
import dao from '../../dao.js'
import { BadRequestError, UnauthorizedError } from '../../errors.js'

const table = 'users'

// Map from DB obj to only return what we want to expose
const mapToUserEntity = (u) => {
  return {
    id: u.id,
    email: u.email,
    alias: u.alias,
    role: u.role,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }
}

const registerUser = async (data) => {
  // Ensure it does not already exist
  const found = await dao.findOne(table, { email: data.email })
  if (found) {
    throw new BadRequestError(`Email ${data.email} already registered`)
  }

  // Encrypt password
  data.password = await auth.encryptPassword(data.password)

  // Add to DB
  const result = await dao.createOne(table, data)

  // Generate JWT
  const token = auth.generateToken(result)
  if (!token) throw new UnauthorizedError()

  // Update lastLogin for user
  await dao.updateOne(table, result.id, {
    lastLoginAt: new Date().toISOString(),
  })

  return {
    success: true,
    message: `Registered user ${result.alias}`,
    token,
    data: mapToUserEntity(result),
  }
}

export default {
  registerUser,
}
