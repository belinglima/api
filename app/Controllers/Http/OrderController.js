const Order = use('App/Models/Order')

/**
 * Resourceful controller for interacting with order
 */
class OrderController {
  /**
   * Show a list of all order.
   * GET order
   */
  async index () {
    const order = Order.query()
    .with('products')
    .fetch()
    return order
  }

  /**
   * Create/save a new order.
   * POST order
   */
  // async store ({ request, response }) {}
  async store ({ request, response }) {
    const data = request.only([
      "user_id",
      "amount", 
      "change"
    ])
    const order = await Order.create(data)

    return order
    // if (order) {
    //   response.status(201).json({
    //     success: 'Created Order',
    //     data: order
    //   })
    // } else {
    //   response.status(204).send({ error: 'Order Not Created' })
    // }
  }

  /**
   * Display a single order.
   * GET order/:id
   */
  async show ({ params }) {
     const order = await Order.find(params.id)
     await order.load('products')
    return order
  }

  /**
   * Update order details.
   * PUT or PATCH order/:id
   */
  async update ({ params, request, response }) {
    const order = await Order.find(params.id)
    const data = request.only([
      "user_id",
      "amount", 
      "change",
      "order_id",
      "products"
    ])
    order.merge(data)
    if (order) {
      response.status(200).json({
        success: 'Order Updated',
        data: data
      })
      await order.save()
    } else {
      response.status(304).send({ error: 'Order Not Updated' })
    }
  }

  /**
   * Delete a order with id.
   * DELETE order/:id
   */
  async destroy ({ params, response }) {
      // retrieve the data by given id
      const order = await Order.find(params.id)
       if (order) {
         response.status(200).json({
           success: 'Deleted Order',
           data: order
         })
         await order.delete()
       }else {
         response.status(404).send({ error: 'Order Not Found' })
       }
  }
}

module.exports = OrderController


