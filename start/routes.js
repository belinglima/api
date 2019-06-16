const Route = use('Route')

// rotas public
Route.post('/sessions', 'SessionController.create')
Route.post('/user', 'UserController.store')

Route
  .group(() => {
    Route.resource('/order', 'OrderController').apiOnly()
    Route.resource('/product', 'ProductController').apiOnly()
    Route.resource('/category', 'CategoryController').apiOnly()
    Route.resource('/user', 'UserController').apiOnly()
  }).prefix('auth').middleware(['auth'])

Route
  .group(() => {
    Route.post('/product/:id/images', 'ImageProductController.store')
    Route.post('/order/:id/addproduct', 'OrderController.product')
    Route.get('/image/:path', 'ImageProductController.show')
    Route.post('/category/:id/images', 'ImageCategoryController.store')
    Route.get('/image/:path', 'ImageCategoryController.show')
    Route.post('/user/:id/images', 'ImageUserController.store')
    Route.get('/image/:path', 'ImageUserController.show')
  })

  // rota public
Route.get('/*', () => {
    return `
    <html>
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <section>
          <div class="logo"></div>
          <div class="title"></div>
          <div class="subtitle"><p>
          Page with restrictions, I'll see you on the dashboard if you're an admin,
          see ya.
          </p></div>
        </section>
      </body>
    </html>
    `
  })
