'use strict'

const Helpers = use('Helpers')
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with images
 */
class ImageUserController {
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  /**
   * Create/save a new image.
   * POST images
   */
  async store ({ params, request }) {
    const user = await User.findOrFail(params.id)

    const images = request.file('image', {
      types: ['image'],
      size: '30mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.movedAll()) {
      return images.errors()
    }

    await Promise.all(
      images
        .movedList()
        .map(image => User.images().create({ path: image.fileName }))
    )
  }
}

module.exports = ImageUserController
