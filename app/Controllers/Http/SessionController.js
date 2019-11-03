const User = use('App/Models/User')

class SessionController {
  async create ({ request, auth, response }) { 
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)
    const user = await User.findBy('email', email)

    if (user) {
      response.status(200).json({
        token: token,
        isAdmin: user['isAdmin'],
        nome :user['name']
      })
    }

    return ({token })
  }
}


module.exports = SessionController