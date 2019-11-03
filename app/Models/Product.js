const Model = use('Model')

class Product extends Model {

    category () {
        return this.belongsTo('App/Models/Category')
    }

    image () {
        return this.hasMany('App/Models/ImageProduct')
    }

    order () {
        return this.belongsToMany('App/Models/Order')
        .pivotTable('OrderProducts')
        .withPivot(['qtd', 'amount'])
    }
}

module.exports = Product
