import express from 'express'

import { admin, auth } from '../../middleware/auth.js'
import { validateFilterQuery, validateUUIDParam } from '../../middleware/shared.validators.js'
import { validateInsertPayload, validateUpdatePayload } from './proverb.validators.js'
import { createProverb, deleteProverb, findProverbById, queryProverbs, updateProverb } from './proverb.handler.js'

const router = express.Router()

router.get('/', validateFilterQuery, queryProverbs)
router.get('/:id', validateUUIDParam, findProverbById)
router.post('/', auth, admin, validateInsertPayload, createProverb)
router.patch('/:id', auth, admin, validateUUIDParam, validateUpdatePayload, updateProverb)
router.delete('/:id', auth, admin, validateUUIDParam, deleteProverb)

export default router
