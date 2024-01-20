import { NotFoundError } from '../errors.js'

export default (req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} was not found`))
}
