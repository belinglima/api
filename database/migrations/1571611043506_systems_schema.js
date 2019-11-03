'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SystemsSchema extends Schema {
  up () {
    this.create('systems', (table) => {
      table.increments()
      table.boolean('status').defaultTo(false).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('systems')
  }
}

module.exports = SystemsSchema
