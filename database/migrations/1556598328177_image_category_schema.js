const Schema = use('Schema')

class ImageCategorySchema extends Schema {
  up () {
    this.create('image_categories', (table) => {
      table.increments()
      table
      .integer('category_id').unsigned().references('id').inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.string('path').notNullable()
    table.timestamps()
    })
  }

  down () {
    this.drop('image_categories')
  }
}

module.exports = ImageCategorySchema
