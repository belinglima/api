
const Model = use('Model')

class Order extends Model {
    user () {
        return this.manyThrough('App/Models/User','order')
    }

    product () {
        return this.belongsToMany('App/Models/Product')
        .pivotTable('OrderProducts')
        .withPivot(['qtd', 'amount', 'obs'])
    }


}

module.exports = Order
