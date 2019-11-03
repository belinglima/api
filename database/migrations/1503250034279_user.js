const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('cpf', 14).unique().nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('telephone', 20).nullable()
      table.string('address', 70).nullable()
      table.string('number', 6).nullable()
      table.string('neighborhood', 40).nullable()
      table.string('reference', 60).nullable()
      table.boolean('active').defaultTo(true)
      table.boolean('isAdmin').defaultTo(false)
      table.string('token')
      table.timestamp('token_created_at')
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('users')
  }
}

module.exports = UserSchema
