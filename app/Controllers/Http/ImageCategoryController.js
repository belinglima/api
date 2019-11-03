'use strict'

const Category = use('App/Models/Category')
const Helpers = use('Helpers')

class ImageCategoryController {
    async store ({ params, request }) {
        const category = await Category.findOrFail(params.id)
      
        const images = request.file('image', {
          types: ['image'],
          size: '30mb'
        })
      
        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
          name: `${Date.now()}-${file.clientName}`
        }))
      
        if (!images.movedAll()) {
          return image.errors()
        }
      
        await Promise.all(
          images
            .movedList()
            .map(image => category.image().create({ path: image.fileName }))
        )
      }
      async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
      }     
}

module.exports = ImageCategoryController
