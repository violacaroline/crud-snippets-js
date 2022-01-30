/**
 * The routes.
 */
import express from 'express'
import { router as homeRouter } from './home-router.js'
import { router as snippetRouter } from './snippets-router.js' // TEST ADDED BY ME

export const router = express.Router()

router.use('/', homeRouter)

router.use('/snippets', snippetRouter) // TEST ADDED BY ME, SOMETHING IS UP HERE DOES NOT WORK WITHOUT /SNIPPETS
// BUT SOMETIME ADDS SNIPPET/SNIPPET WHEN PRESSING LINKS ON HOME PAGE
router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
