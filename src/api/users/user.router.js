import express from 'express'

import { auth, admin } from '../../middleware/auth.js'
import { validateFilterQuery, validateUUIDParam } from '../../middleware/shared.validators.js'
import { validateLoginPayload, validateRegisterPayload } from './user.validators.js'
import { findUserByID, login, logout, queryUsers, register } from './user.handlers.js'

const router = express.Router()
router.post('/login', validateLoginPayload, login)
router.get('/logout', auth, logout)
router.post('/register', validateRegisterPayload, register)
router.get('/', auth, admin, validateFilterQuery, queryUsers)
router.get('/:id', auth, admin, validateUUIDParam, findUserByID)

export default router
