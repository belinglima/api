'use strict'

const Product = use('App/Models/Product')
const Helpers = use('Helpers')

class ImageProductController {
    async store ({ params, request }) {
        const product = await Product.findOrFail(params.id)
      
        const image = request.file('image', {
          types: ['image'],
          size: '30mb'
        })
      
        await image.moveAll(Helpers.tmpPath('uploads'), file => ({
          name: `${Date.now()}-${file.clientName}`
        }))
      
        if (!image.movedAll()) {
          return image.errors()
        }
      
        await Promise.all(
          image
            .movedList()
            .map(image => product.image().create({ path: image.fileName }))
        )
      }
      async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
      }    
}

module.exports = ImageProductController
