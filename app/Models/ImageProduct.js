'use strict'

const Env = use('Env')
const Model = use('Model')

class ImageProduct extends Model {
    static get computed () {
        return ['url']
      }
    
      getUrl ({ path }) {
        return `${Env.get('APP_URLL')}/image/${path}`
      }
}

module.exports = ImageProduct


