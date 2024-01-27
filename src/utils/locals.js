// Used by validators to set request.locals object later used
// in route handlers

const setData = (req, payload) => {
  req.locals = req.locals ? req.locals : {}
  req.locals.data = payload
}

const setId = (req, value) => {
  req.locals = req.locals ? req.locals : {}
  req.locals.id = value
}

const setQuery = (req, value) => {
  req.locals = req.locals ? req.locals : {}
  req.locals.query = value
}

export default {
  setData,
  setId,
  setQuery,
}
