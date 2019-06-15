const Schema = use('Schema')

class ImageProductSchema extends Schema {
  up () {
    this.create('image_products', (table) => {
      table.increments()
      table
      .integer('product_id').unsigned().references('id').inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.string('path').notNullable()
    table.timestamps()
    })
  }

  down () {
    this.drop('image_products')
  }
}

module.exports = ImageProductSchema
