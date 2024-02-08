import express from 'express'

import { admin, auth, user } from '../../middleware/auth.js'
import { validateFilterQuery, validateUUIDParam } from '../../middleware/shared.validators.js'
import { validateInsertPayload, validateUpdatePayload } from './tag.validators.js'
import { createTag, deleteTag, findTagByID, queryTags, updateTag } from './tag.handlers.js'

const router = express.Router()

router.get('/', validateFilterQuery, queryTags)
router.get('/:id', validateUUIDParam, findTagByID)
router.post('/', auth, user, validateInsertPayload, createTag)
router.patch('/:id', auth, user, validateUUIDParam, validateUpdatePayload, updateTag)
router.delete('/:id', auth, admin, validateUUIDParam, deleteTag)

export default router
