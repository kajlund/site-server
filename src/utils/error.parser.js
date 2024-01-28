export default (error) => {
  const errors = error.details.map((detail) => {
    return { field: detail.path[0], error: detail.message }
  })
  return errors
}
