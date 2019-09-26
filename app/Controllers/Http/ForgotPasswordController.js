'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')
const crypto = require('crypto')
const moment = require('moment')

class ForgotPasswordController {
   /**
   * SOLICITA A ALTERAÇÃO DE SENHA
   */
  async store ({ request , response}) {
  
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()      

      // Envia e-mail para reset de senha
      await Mail.send('emails.forgot_password', user.toJSON(), (message) => {
        message
        .to(user.email)
        .from('pizzabreakapi@gmail.com', 'PizzaBreak | Urgente')
        .subject('Recuperação de senha')
      })

      if (user) {
        response.status(201).json({
          success: true,
          msg: 'Email Enviado para o usuario: '+email
        })
      }
   
  }

  /**
   * UPDATE PASSWORD
   */
  async update ({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      // Valida se a data de criação do token nao expirou o prazo de 2 dias
      const tokenExpired = moment()
        .subtract('1', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O token de recuperação está expirado.' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
      if (user) {
        response.status(201).json({
          success: true,
          user: user.name,
          email: user.email
        })
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { 
          message: 'Algo não deu certo. Tente novamente.', 
          token: 'o token ja deve ter sido utilizado.' 
        } 
      })
    }
  }
}

module.exports = ForgotPasswordController