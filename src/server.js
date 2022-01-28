/**
 * Applications starting point.
 *
 * @author Andrea Viola Caroline Åkesson
 */

import express from 'express'
// import expressLayouts from 'express-ejs-layouts'
// import session from 'express-session'
// import logger from 'morgan'
// import { dirname, join } from 'path'
// import { fileURLToPath } from 'url'
// import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

try {
  // Connect to MongoDB
  await connectDB()

  // Create express application.
  const app = express()

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
