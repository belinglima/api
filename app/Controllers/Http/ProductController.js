const Product = use('App/Models/Product')

/**
 * Resourceful controller for interacting with product
 */
class ProductController {
  /**
   * Show a list of all product.
   * GET product
   */
  async index () {
    const product = Product.query()
    .with('image')
    .fetch()
    return product
  }

  /**
   * Create/save a new product.
   * POST product
   */
  // async store ({ request, response }) {}
  async store ({ auth, request, response }) {
    const data = request.only([
      "category_id",
      "name", 
      "description", 
      "price", 
      "active"])
    const product = await Product.create(data)
    if (product) {
      response.status(201).json({
        success: 'Created Product',
        id: product.id
      })
    } else {
      response.status(204).send({ error: 'Product Not Created' })
    }
  }

   /**
   * Display a single product.
   * GET product/:id
   */
  async show ({ params }) {
    const product = await Product.find(params.id)
    await product.load('image')
    return product
  }

  /**
   * Update product details.
   * PUT or PATCH product/:id
   */
  async update ({ params, request, response }) {
    const product = await Product.find(params.id)
    const data = request.only([
      "category_id",
      "name", 
      "description", 
      "price", 
      "active"
    ])
    product.merge(data)
    if (product) {
      response.status(200).json({
        success: 'Product Updated',
        id: product.id
      })
      await product.save()
    } else {
      response.status(304).send({ error: 'Product Not Updated' })
    }
  }

  /**
   * Delete a product with id.
   * DELETE product/:id
   */
  async destroy ({ params, response }) {
      // retrieve the data by given id
      const product = await Product.find(params.id)
       if (product) {
         response.status(200).json({
           success: 'Deleted Record',
           data: product
         })
         await product.delete()
       }else {
         response.status(404).send({ error: 'Product Not Found' })
       }
  }
}

module.exports = ProductController


