/**
 * Home controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    const userNameView = req.session.userid
    console.log('Log the active user from home index controller', req.session.userid)
    res.render('home/index', { userNameView })
  }

  /**
   * Header.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  // header (req, res) {
  //   const user = req.session.userid
  //   console.log(user)
  //   console.log('Log the active user from home index controller', req.session.userid)
  //   res.render('./partials/header', { user })
  // }
}
