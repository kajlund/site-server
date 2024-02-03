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

export const findUserById = async (id) => {
  const user = await dao.findOne(table, { id })
  if (user) return mapToUserEntity(user)
  return null
}

export const loginUser = async (data) => {
  // ensure user is registered
  const found = await dao.findOne(table, { email: data.email })
  if (!found || found.archivedAt) {
    throw new UnauthorizedError()
  }

  const pwdOK = await auth.comparePasswords(data.password, found.password)
  if (!pwdOK) {
    throw new UnauthorizedError()
  }

  // Generate JWT
  const token = auth.generateToken(found)
  if (!token) throw new UnauthorizedError()

  // Update lastLogin for user
  const updated = await dao.updateOne(table, found.id, {
    lastLoginAt: new Date().toISOString(),
  })

  return { token, user: mapToUserEntity(updated) }
}

export const queryUsers = async (query) => {
  // Set default query, sort and limit if not set by query params
  if (query.sort === '') query.sort = 'alias'
  if (query.limit === 0) query.limit = 50
  query.filter = query.filter ? (query.filter = { field: 'alias', value: query.filter }) : null

  const result = await dao.findMany(table, query)
  const users = result.map((usr) => mapToUserEntity(usr))
  return users
}

export const registerUser = async (data) => {
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
  const updated = await dao.updateOne(table, result.id, {
    lastLoginAt: new Date().toISOString(),
  })

  return { token, user: mapToUserEntity(updated) }
}

export default {
  findUserById,
  loginUser,
  queryUsers,
  registerUser,
}
