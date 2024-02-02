import express from 'express'

import { validateFilterQuery, validateUUIDParam } from '../../middleware/shared.validators.js'
import { validateInsertPayload, validateUpdatePayload } from './tag.validators.js'
import { createTag, deleteTag, findTagByID, queryTags, updateTag } from './tag.handlers.js'

const router = express.Router()

router.get('/', validateFilterQuery, queryTags)
router.get('/:id', validateUUIDParam, findTagByID)
router.post('/', validateInsertPayload, createTag)
router.patch('/:id', validateUUIDParam, validateUpdatePayload, updateTag)
router.delete('/:id', validateUUIDParam, deleteTag)

export default router
