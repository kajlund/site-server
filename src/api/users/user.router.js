import express from 'express'

import { auth, admin } from '../../middleware/auth.js'
import { validateFilterQuery } from '../../middleware/shared.validators.js'
import { validateLoginPayload, validateRegisterPayload } from './user.validators.js'
import { login, queryUsers, register } from './user.handlers.js'

const router = express.Router()
router.get('/', auth, admin, validateFilterQuery, queryUsers)
router.post('/login', validateLoginPayload, login)
router.post('/register', validateRegisterPayload, register)

export default router
