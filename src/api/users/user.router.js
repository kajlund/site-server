import express from 'express'

import { validateLoginPayload, validateRegisterPayload } from './user.validators.js'
import { login, register } from './user.handlers.js'

const router = express.Router()
router.post('/login', validateLoginPayload, login)
router.post('/register', validateRegisterPayload, register)

export default router
