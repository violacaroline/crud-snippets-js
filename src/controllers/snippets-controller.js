import { Snippet } from '../models/snippet.js'
import { User } from '../models/user.js'

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
      // console.log('Den jävla sessionen: ', req.session)
      const viewData = {
        snippets: (await Snippet.find())
          .map(snippet => snippet.toObject())
      }
      const userid = req.session.userid
      console.log('Trying to get the name', req.session.user)
      const userNameView = req.session.user

      res.render('snippets/index', { viewData, userid, userNameView })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for logging in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register (req, res) {
    const userNameView = req.session.user

    res.render('snippets/register', { userNameView })
  }

  /**
   * Registers a user. NEEDS TO BE FIXED.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   */
  async registerPost (req, res) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
      const { username } = req.body

      const userExists = await User.findOne({ username }) // IS THIS NEEDED?
      console.log('User exists', userExists)

      await user.save()

      req.session.flash = { type: 'success', text: 'You have been registered!' }
      res.redirect('./login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Registration failed.' }
      res.redirect('./register')
    }
  }

  /**
   * Returns a HTML form for logging in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async login (req, res) {
    const userNameView = req.session.user

    res.render('snippets/login', { userNameView })
  }

  /**
   * Logs a user in. NEEDS TO BE FIXED.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   */
  async loginPost (req, res) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)
      console.log('The userid that later will be set on snippet: ', user.id)
      req.session.regenerate(() => {
        req.session.user = req.body.username
        req.session.userid = user.id
        req.session.flash = { type: 'success', text: 'You have been logged in!' }
        res.redirect('.')
      })
      console.log('Logging in')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message } // 'Log in failed'
      res.redirect('./login')
    }
  }

  /**
   * Bla.
   *
   * @param {object} req - bla
   * @param {object} res - bla
   */
  async logout (req, res) {
    if (req.session) {
      req.session.flash = { type: 'success', text: 'You are logged out!' }
      req.session.destroy()
      res.redirect('/')
      console.log('Logging out')
    }
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    const userNameView = req.session.user

    res.render('snippets/create', { userNameView })
  }

  /**
   * Creates a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async createPost (req, res) {
    console.log('The req.session: ', req.session)
    console.log('The req.session.userid from createPost', req.session.userid)

    try {
      const snippet = new Snippet({
        userid: req.session.userid,
        title: req.body.title,
        snippet: req.body.snippet
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
      const userNameView = req.session.user

      res.render('snippets/update', { viewData: snippet.toObject(), userNameView })
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
        snippet.title = req.body.title
        snippet.snippet = req.body.snippet

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
      const userNameView = req.session.user

      res.render('snippets/delete', { viewData: snippet.toObject(), userNameView })
    } catch (error) {
      // req.session.flash = { type: 'danger', text: error.message }
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
