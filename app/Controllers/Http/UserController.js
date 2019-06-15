const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with user
 */
class UserController {
  /**
   * Show a list of all user.
   * GET user
   */
  async index () {
    const user = User.query()
      .with('image')
      .fetch()
    return user
  }

  /**
   * Create/save a new user.
   * POST user
   */
  // async store ({ request, response }) {}
  async store ({ request, response }) {
    const data = request.only([
      "name", 
      "email", 
      "telephone",
      "address",
      "cpf",
      "password",
      "reference",
      "number",
      "neighborhood",
    ])
    const user = await User.findOrCreate(data)
    if (user) {
      response.status(201).json({
        success: 'Created User',
        data: data
      })
    } else {
      response.status(204).send({ error: 'User Not Created' })
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   */
  async show ({ params }) {
    const user = await User.find(params.id)
    await user.load('image')
    return user
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   */
  async update ({ params, request, response }) {
    const user = await User.find(params.id)
    const data = request.only([
     "name", 
     "email", 
     "telephone",
     "address",
     "cpf",
     "password",
     "number",
     "neighborhood",
     "reference",
     "active",
     "isAdmin"
    ])
    user.merge(data)
    if (user) {
      response.status(200).json({
        success: 'User Updated',
        data: data
      })
      await user.save()
    } else {
      response.status(304).send({ error: 'User Not Updated' })
    }
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   */
  async destroy ({ params, response }) {
      // retrieve the data by given id
      const user = await User.find(params.id)
       if (user) {
         response.status(200).json({
           success: 'Deleted User',
           data: user
         })
         await user.delete()
       }else {
         response.status(404).send({ error: 'User Not Found' })
       }
  }
}

module.exports = UserController


