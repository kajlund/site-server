import cors from 'cors'
import express from 'express'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

import { NotFoundError } from './errors.js'
import { codes, phrases } from './statuscodes.js'
import { log } from 'console'

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
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} was not found`))
})

// Generic error handler
app.use((err, req, res, next) => {
  let error = {
    success: false,
    statusCode: codes.BAD_REQUEST,
    message: phrases.BAD_REQUEST,
  }

  if (!err.isAppError) {
    log.error(err)

    // Knex/Postgres DB Errors
    if (err.code) {
      // Faulty UUID format
      if (err.code === '22P02') {
        error.statusCode = statusCodes.BAD_REQUEST
        error.message = reasonPhrases.BAD_REQUEST
        error.detail = 'Faulty uuid format'
      }
      // Unique constraint error
      if (err.code === '23505') {
        error.statusCode = statusCodes.BAD_REQUEST
        error.message = phrases.BAD_REQUEST
        error.detail = err.detail
      }
      // Faulty column name
      if (err.code === '42703') {
        error.statusCode = codes.BAD_REQUEST
        error.message = phrases.BAD_REQUEST
        error.detail = 'Database error: Check field names'
      }
    }
  } else {
    error = { ...err }

    // list of input field errors?
    if (err.errors) {
      error.detail = err.errors
    }
  }

  return res.status(error.statusCode).json(error)
})

export default app
