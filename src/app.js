import cors from 'cors'
import express from 'express'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

import notFoundHandler from './middleware/notfound.handler.js'

const app = express()

// Middleware to handle incoming JSON payloads
app.use(express.json())
// Middleware for url encoding
app.use(express.urlencoded({ extended: true }))
// Middleware for handling CORS policy
app.use(cors())

// Serve static assets
app.use(express.static(path.join(process.cwd(), 'public')))

// Helper endpoints for service check
app.get('/ping', (req, res) => {
  res.send('pong')
})

// 404 Handler
app.use(notFoundHandler)

export default app
