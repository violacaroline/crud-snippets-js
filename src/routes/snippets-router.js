import express from 'express'
import createError from 'http-errors'
import { SnippetsController } from '../controllers/snippets-controller.js'
import { User } from '../models/user.js'

export const router = express.Router()

const controller = new SnippetsController()

/**
 * Authorization function.
 *
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Next function call.
 * @returns {Error} - An errror page.
 */
const authorizeUser = async (req, res, next) => {
  // Logik if userid snipp samma som logged in user req.params.id
  const authorized = await User.authorize(req, res, next)
  console.log(authorized)
  if (authorized) {
    console.log('Hi Im authorized')
    next()
  } else {
    console.log('Hi Im not authorized')
    return next(createError(403, 'Forbidden'))
  }
}

// Map HTTP verbs and route paths to controller action methods.

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/register', (req, res, next) => controller.register(req, res, next))
router.post('/register', (req, res, next) => controller.registerPost(req, res, next))

router.get('/login', (req, res, next) => controller.login(req, res, next))
router.post('/login', (req, res, next) => controller.loginPost(req, res, next))

router.get('/logout', (req, res, next) => controller.logout(req, res, next))

router.get('/create', (req, res, next) => controller.create(req, res, next))
router.post('/create', (req, res, next) => controller.createPost(req, res, next))
// User inloggad måste vara samma som userid på snippet
router.get('/:id/update', authorizeUser, (req, res, next) => controller.update(req, res, next))
router.post('/:id/update', authorizeUser, (req, res, next) => controller.updatePost(req, res, next))

router.get('/:id/delete', (req, res, next) => controller.delete(req, res, next))
router.post('/:id/delete', (req, res, next) => controller.deletePost(req, res, next))
