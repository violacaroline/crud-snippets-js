import { Snippet } from '../models/snippet.js'

/**
 * Snippets controller.
 */
export class SnippetsController {
  /**
   * Displays list of code snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        snippets: (await Snippet.find())
          .map(snippet => snippet.toObject())
      }

      res.render('snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    res.render('snippets/create')
  }

  /**
   * Creates a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async createPost (req, res) {
    console.log(req.body)
    try {
      const snippet = new Snippet({
        description: req.body.description
      })

      await snippet.save()

      req.session.flash = { type: 'success', text: 'The snippet was created!' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./create')
    }
  }

  /**
   * Returns a HTML form for updating a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      res.render('snippets/update', { viewData: snippet.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Updates a specific snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async updatePost (req, res) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      if (snippet) {
        snippet.description = req.body.description
        snippet.done = req.body.done === 'on'

        await snippet.save()

        req.session.flash = { type: 'success', text: 'The snippet was updated!' }
      } else {
        req.session.flash = {
          type: 'danger',
          text: 'The snippet you attempted to update was removed by another user after you got the original values.'
        }
      }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./update')
    }
  }

  /**
   * Returns a HTML form for deleting a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      res.render('tasks/delete', { viewData: snippet.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes the specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async deletePost (req, res) {
    try {
      await Snippet.findByIdAndDelete(req.body.id)

      req.session.flash = { type: 'success', text: 'The snippet was deleted.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./delete')
    }
  }
}
