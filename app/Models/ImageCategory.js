'use strict'

const Env = use('Env')
const Model = use('Model')

class ImageCategory extends Model {
    static get computed () {
        return ['url']
      }
    
      getUrl ({ path }) {
        return `${Env.get('APP_URL')}/image/${path}`
      }
}

module.exports = ImageCategory
