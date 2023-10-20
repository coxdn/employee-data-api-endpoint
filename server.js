const app = require('./app/app')

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const gracefulShutdown = () => {
  console.log('Server is gracefully shutting down...')
  server.close(() => {
    console.log('Server has been gracefully terminated.')
    process.exit(0)
  })
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  gracefulShutdown()
})