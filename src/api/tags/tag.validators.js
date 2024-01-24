import Joi from 'joi'

import { UnprocessableEntityError } from '../../errors.js'

const schema = Joi.object().keys({
  tag: Joi.string().min(2).max(25).trim().required(),
})

export const validateTagData = (req, res, next) => {
  const { error, value } = Joi.compile(schema).validate(req.body)
  if (error) {
    const errorDetail = error.details.map((details) => details.message).join(', ')
    const err = new UnprocessableEntityError(errorDetail)
    return next(err)
  }
  req.locals = { ...{ data: value } }
  return next()
}
