const Schema = use('Schema')

class ImageUserSchema extends Schema {
  up () {
    this.create('image_users', (table) => {
      table.increments()
      table
      .integer('user_id').unsigned().references('id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.string('path').notNullable()
    table.timestamps()
    })
  }

  down () {
    this.drop('image_users')
  }
}

module.exports = ImageUserSchema
