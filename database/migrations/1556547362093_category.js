const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('title', 80).notNullable()
      table.string('description', 254).notNullable()
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('categories')
  }
}

module.exports = CategorySchema
