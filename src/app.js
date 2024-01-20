import express from 'express'
import path from 'path'

const app = express()

// Middleware to handle incoming JSON payloads
app.use(express.json())
// Middleware for url encoding
app.use(express.urlencoded({ extended: true }))

// Serve static assets
app.use(express.static(path.join(process.cwd(), 'public')))

app.get('/ping', (req, res) => {
  res.send('pong')
})

export default app
