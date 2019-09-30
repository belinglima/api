const Database = use('Database')

class LogicaController {

  async index ({ request, response }) {
    const email = request.only([
      "email"
    ])
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
        data: false
      })
    }
  }

  async maisVendidos({ request }) {
    const datas = request.only([
      "inicio",
      "fim"
    ])

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
  }

  async oferta() {
    return await Database
    .select('product_id','order_id','qtd','products.name')
    .from('OrderProducts')
    .innerJoin('orders', 'order_id', 'orders.id')
    .innerJoin('users' , 'user_id', 'users.id')
    .innerJoin('products', 'product_id', 'products.id')
    .orderByRaw('rand()')
    .limit(1)
  }

  async teste({ request }){
    const dados = request.only([
      "product_id"
    ])

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
    .groupBy('product_id')
    .orderBy('i.id')
    .orderByRaw('rand()')
    .limit(1)
  }


  // SELECT *, count( product_id ) AS num
  // FROM OrderProducts as i
  // INNER JOIN orders as l ON i.product_id = l.id
  // WHERE product_id IN (
  // SELECT order_id
  // FROM OrderProducts
  // WHERE product_id = 1)
  // AND product_id <> 1
  // GROUP BY product_id
  // ORDER BY num DESC 
  // LIMIT 3



// SELECT i.livro_id, l.titulo, l.autor, l.editora, l.preco, count( i.livro_id ) AS num
// FROM itensvenda i
// INNER JOIN livros l ON i.livro_id = l.id
// WHERE venda_id IN (
// SELECT venda_id
// FROM itensvenda
// WHERE livro_id = 2)
// AND livro_id <> 2
// GROUP BY livro_id
// ORDER BY num DESC 
// LIMIT 3

  // async create ({ request, response, view }) { }
  // async store ({ request, response }) { }
  // async show ({ params, request, response, view }) { }
  // async edit ({ params, request, response, view }) { }
  // async update ({ params, request, response }) { }
  // async destroy ({ params, request, response }) { }
}

module.exports = LogicaController
