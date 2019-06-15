const Model = use('Model')

class Category extends Model {

    product () {
        return this.hasMany('App/Models/Product')
    }

    image () {
        return this.hasMany('App/Models/ImageCategory')
    }
}

module.exports = Category
