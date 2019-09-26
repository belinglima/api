'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RatingSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.integer('rating')
      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }
}

module.exports = RatingSchema
