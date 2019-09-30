'use strict'

const Model = use('Model')
const Env = use('Env')

class ImageUser extends Model {
    static get computed () {
        return ['url']
      }
    
      getUrl ({ path }) {
        return `${Env.get('APP_URLL')}/image/${path}`
      }
}

module.exports = ImageUser