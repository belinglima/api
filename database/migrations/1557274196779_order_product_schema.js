const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up () {
    this.create('OrderProducts', (table) => {
      table.increments()
      table.integer('order_id').unsigned().references('id').inTable('orders')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.integer('qtd').notNullable()
      table.decimal('amount').notNullable() 
      table.timestamps() 
    })
  }

  down () {
    this.dropIfExists('OrderProducts')
  }
}

module.exports = OrderProductSchema
