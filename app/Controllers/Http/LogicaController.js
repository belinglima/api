const Database = use('Database')
const Systems = use('App/Models/Systems')
const User = use('App/Models/User')

class LogicaController {
  
  async index ({ request, response }) {
    const email = request.only([
      "email"
    ])

    if(!email['email']){
      response.status(200).json({
        data: false,
        erro: 'necessário inserir o email'
      })
    }else {
      const user = await Database
      .table('users')
      .where('email', email['email'])
      .first()
  
      if (user) {
        response.status(200).json({
          data: true
        })
      } else {
        response.status(200).json({
          data: false,
        })
      }
    }
  }

  async maisVendidos({ request, response }) {
    const datas = request.only([
      "inicio",
      "fim"
    ])

    if (datas['inicio'] && datas['fim']) {
      return await Database
        .select('created_at','product_id')
        .sum('qtd as qtd')
        .sum('amount as amountTotal')
        .from('OrderProducts')
        .whereExists(
          function () {
            this.select('*')
            .from('orders')
            .innerJoin('OrderProducts',  'order_id', 'orders.id')
          }
        )
        .whereBetween('created_at', [datas['inicio'], datas['fim']])
        .groupBy('product_id')
        .orderBy('qtd', 'desc')
        .pluck('product_id').first()
    } else {
      response.status(200).json({
        data: false,
        erro: 'Necessário as duas datas ( inicio & fim ).'
      })
    }
  }

  async oferta() {
    return await Database
    .select('product_id','order_id','qtd','products.name')
    .from('OrderProducts')
    .innerJoin('orders', 'order_id', 'orders.id')
    .innerJoin('users' , 'user_id', 'users.id')
    .innerJoin('products', 'product_id', 'products.id')
    .orderByRaw('rand()')
  }

  async quem({ request, response }){
    const dados = request.only([
      "product_id"
    ])

    if (dados['product_id']) {
      return await Database
      .select('product_id','order_id','qtd','i.id')
      .from('OrderProducts as i')
      .innerJoin('orders as o', 'i.order_id', 'o.id')
      .whereExists( function () {
        this.select('order_id')
            .from('OrderProducts')
            .where('product_id', dados['product_id'])
            .having('product_id', '<>', dados['product_id'])
      })
      .groupBy('product_id','order_id', 'qtd', 'i.id')
      .orderBy('i.id')
      .orderByRaw('rand()')
      .limit(1)
    }else{
      response.status(200).json({
        data: false,
        erro: 'Necessário inserir o produto_id ( product_id: [1] )'
      })
    }
  }

  async abrefecha ({ params , request, response }){
    const systems = await Systems.find(params.id)
    const data = request.only([ "status" ])
     systems.merge(data)
    if (systems) {
      response.status(200).json({
        success: 'Systems Updated',
        data: systems['status']
      })
      await systems.save()
    } else {
      response.status(304).send({ error: 'systems Not Updated' })
    }
  }

  async status ({ params }){
    const systems = await Systems.find(params.id)
    return systems
  }

  async novos () {
   return Database.table('users')
           .select(Database.raw('DATE_FORMAT(created_at, "%m") as mes'))
           .count('* as total')
           .groupBy('mes')
  }


   async contar() {
    const count = await Database
    .from('orders')
    .where('status', 'PENDING')
    .count('* as contagem')                               

    const total = count[0]
    return total
  }

  async maisCompram() {
    const usuarios = await Database
    .select('o.user_id', 'u.name')
    .from('orders as o')
    .innerJoin('users as u' , 'o.user_id', 'u.id')
    .orderBy('u.name', 'ASC')
    // .whereBetween('updated_at', [2019-11-01 00:00:00, 2019-11-30 00:00:00])
    .limit('15')

    return usuarios

  }
}

module.exports = LogicaController


// ->where('data > ', date('Y-m-d 00:00:00'))
//             ->where('data < ', date('Y-m-d 23:59:59'))

    // "id": 1,
    // "order_id": 1,
    // "product_id": 9,
    // "qtd": 20,
    // "amount": 65,