const Category = use('App/Models/Category')

/**
 * Resourceful controller for interacting with product
 */
class CategoryController {
  /**
   * Show a list of all product.
   * GET product
   */
  async index () {
    const category = Category.query()
    .with('image')
    .fetch()
    return category
  }

  /**
   * Create/save a new product.
   * POST product
   */
  // async store ({ request, response }) {}
  async store ({ request, response }) {
    const data = request.only([
      "title",
      "description", 
      "active"
    ])
    const category = await Category.create(data)
    if (category) {
      response.status(201).json({
        success: 'Created Category',
        id: category.id
      })
    } else {
      response.status(204).send({ error: 'Category Not Created' })
    }
  }

  /**
   * Display a single product.
   * GET product/:id
   */
  async show ({ params }) {
    const category = await Category.find(params.id)
    await category.loadMany(['image','product'])
    return category
  }

  /**
   * Update product details.
   * PUT or PATCH product/:id
   */
  async update ({ params, request, response }) {
    const category = await Category.find(params.id)
    const data = request.only([
      "title",
      "description", 
      "active"])
    category.merge(data)
    if (category) {
      response.status(200).json({
        success: 'Category Updated',
        id: category.id
      })
      await category.save()
    } else {
      response.status(304).send({ error: 'Category Not Updated' })
    }
  }

  /**
   * Delete a product with id.
   * DELETE product/:id
   */
  async destroy ({ params, response }) {
      // retrieve the data by given id
      const category = await Category.find(params.id)
       if (category) {
         response.status(200).json({
           success: 'Deleted Category',
           data: category
         })
         await category.delete()
       }else {
         response.status(404).send({ error: 'Category Not Found' })
       }
  }
}

module.exports = CategoryController


