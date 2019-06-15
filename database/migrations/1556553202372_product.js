const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', table => {
      table.increments()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.decimal('price').notNullable()
      table.boolean('active').defaultTo(true).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
