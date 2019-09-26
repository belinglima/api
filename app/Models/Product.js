const Model = use('Model')

class Product extends Model {

    category () {
        return this.belongsTo('App/Models/Category')
    }

    image () {
        return this.hasMany('App/Models/ImageProduct')
    }

    order () {
        return this.belongsToMany('App/Models/Orders').pivotTable('OrderProducts')
    }
}

module.exports = Product
