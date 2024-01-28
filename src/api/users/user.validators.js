import Joi from 'joi'

import { BadRequestError } from '../../errors.js'
import locals from '../../utils/locals.js'
import errorParser from '../../utils/error.parser.js'

const insertPayload = (req, res, next) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().email().trim().required(),
      alias: Joi.string().min(2).max(15).required().trim(),
      password: Joi.string().min(8).max(100).trim().required(),
      repeat_password: Joi.ref('password'),
    })
    .with('password', 'repeat_password')

  const { error, value } = Joi.compile(schema).validate(req.body, { abortEarly: false })
  if (error) {
    const err = new BadRequestError('Faulty input payload', errorParser(error))
    return next(err)
  }

  delete value.repeat_password
  locals.setData(req, value)
  return next()
}

export default {
  insertPayload,
}
