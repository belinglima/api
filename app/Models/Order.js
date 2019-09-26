
const Model = use('Model')

class Order extends Model {
    user () {
        return this.manyThrough('App/Models/User','order')
    }

    products () {
        return this.belongsToMany('App/Models/Product').pivotTable('OrderProducts')
    }
}

module.exports = Order
