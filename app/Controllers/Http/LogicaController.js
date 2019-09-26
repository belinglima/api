const Database = use('Database')

class LogicaController {

  async index ({ request }) {
    const email = request.only([
      "email"
    ])
    return await Database
    .table('users')
    .where('email', email['email'])
    .first()
  }

  // async create ({ request, response, view }) {
  // }

  // async store ({ request, response }) {
  // }

  // async show ({ params, request, response, view }) {
  // }

  // async edit ({ params, request, response, view }) {
  // }

  // async update ({ params, request, response }) {
  // }

  // async destroy ({ params, request, response }) {
  // }
}

module.exports = LogicaController
