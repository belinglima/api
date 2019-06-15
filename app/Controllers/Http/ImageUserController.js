'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')

class ImageUserController {
    async store ({ params, request }) {
        const user = await User.findOrFail(params.id)
      
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
            .map(image => user.image().create({ path: image.fileName }))
        )
      }
      async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
      }  

}

module.exports = ImageUserController
