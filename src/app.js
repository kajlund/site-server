import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

import db from './db.js'
import { NotFoundError } from './errors.js'
import log from './logger.js'
import { codes, phrases } from './statuscodes.js'
import tagRoutes from './api/tags/tag.router.js'
import userRoutes from './api/users/user.router.js'

const app = express()

// Middleware to parse cookies
app.use(cookieParser(process.env.JWT_SECRET))

// Middleware to handle incoming JSON payloads
app.use(express.json())

// Middleware for url encoding
app.use(express.urlencoded({ extended: false }))

// Middleware for handling CORS policy
app.use(cors())

// Serve static assets
app.use(express.static(path.join(process.cwd(), 'public')))

// Helper endpoints for service check
app.get('/ping', (req, res) => {
  res.send('pong')
})

// API Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tags', tagRoutes)

// 404 Handler
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} was not found`))
})

// Generic error handler
app.use((err, req, res, next) => {
  let error = {
    success: false,
    statusCode: codes.INTERNAL_SERVER_ERROR,
    message: phrases.INTERNAL_SERVER_ERROR,
  }

  if (!err.isAppError) {
    log.error(err)

    // Knex/Postgres DB Errors
    if (err.code) {
      // Faulty UUID format
      if (err.code === '22P02') {
        error.message = 'Faulty uuid format'
      }
      // Unique constraint error
      if (err.code === '23505') {
        error.message = err.detail
      }
      // Faulty column name
      if (err.code === '42703') {
        error.message = 'Database error: Check field names'
      }
    }
  } else {
    error.message = err.message
    error.statusCode = err.statusCode
    error.detail = err.detail
    error.errors = err.errors
  }

  return res.status(error.statusCode).json(error)
})

// Connect to DB
db.connect()

export default app
