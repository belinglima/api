const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.decimal('change').nullable()
      table.enu('status', ['PENDING', 'DELIVERED', 'PREPARING', 'CANCELED']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
