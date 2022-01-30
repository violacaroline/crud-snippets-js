import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'

export const router = express.Router()

const controller = new SnippetsController()

// Map HTTP verbs and route paths to controller action methods.

router.get('/', (req, res, next) => controller.index(req, res, next)) // FUNGERAR INTE UTAN SNIPPETS?

router.get('/create', (req, res, next) => controller.create(req, res, next)) // JAG HAR LAGT TILL /SNIPPETS/
router.post('/create', (req, res, next) => controller.createPost(req, res, next)) // JAG HAR LAGT TILL /SNIPPETS/

router.get('/:id/update', (req, res, next) => controller.update(req, res, next))
router.post('/:id/update', (req, res, next) => controller.updatePost(req, res, next))

router.get('/:id/delete', (req, res, next) => controller.delete(req, res, next))
router.post('/:id/delete', (req, res, next) => controller.deletePost(req, res, next))
