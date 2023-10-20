const handleNotFound = (req, res, next) => {
  res.status(404).send({ error: "Route not found" })
}

const handleServerError = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: 'Something went wrong' })
}

module.exports = {
  handleNotFound,
  handleServerError,
}