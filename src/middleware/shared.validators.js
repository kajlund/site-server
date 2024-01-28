import Joi from 'joi'

import { BadRequestError } from '../errors.js'
import locals from '../utils/locals.js'
import errorParser from '../utils/error.parser.js'

const requiredUUIDv4Schema = Joi.object().keys({
  id: Joi.string()
    .required()
    .guid({
      version: ['uuidv4'],
    }),
})

const querySchema = Joi.object().keys({
  filter: Joi.string().trim().default(''),
  sort: Joi.string().alphanum().default(''),
  limit: Joi.number().default(0),
  skip: Joi.number().default(0),
})

const qryFilter = (req, res, next) => {
  const { error, value } = Joi.compile(querySchema).validate(req.query)
  if (error) {
    const err = new BadRequestError('Filter error', errorParser(error))
    return next(err)
  }

  locals.setQuery(req, value)
  return next()
}

const prmUUID = (req, res, next) => {
  const { error, value } = Joi.compile(requiredUUIDv4Schema).validate(req.params)

  if (error) {
    const err = new BadRequestError('Faulty UUID param', errorParser(error.details))
    return next(err)
  }

  locals.setId(req, value.id)
  return next()
}

export default {
  qryFilter,
  prmUUID,
}
