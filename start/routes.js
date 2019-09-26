const Route = use('Route')

// rotas publicas
Route.post('/sessions', 'SessionController.create')
Route.post('/user', 'UserController.store')

Route.get('/image/:path', 'ImageProductController.show')
Route.get('/image/:path', 'ImageCategoryController.show')
Route.get('/image/:path', 'ImageUserController.show')

 // rota logica
 Route.post('/logica', 'LogicaController.index')

// reset de senha
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords/confirm', 'ForgotPasswordController.update')

// rotas de acesso facebook base_url/facebook
Route.get('facebook', async ({ ally }) => {
  await ally.driver('facebook').redirect()
})
Route.get('facebook/authenticated', async ({ ally }) => {
  const user = await ally.driver('facebook').getUser()
  return user
})

// rotas de acesso google base_url/google
Route.get('google', async ({ ally }) => {
  await ally.driver('google').redirect()
})
Route.get('google/authenticated', async ({ ally }) => {
  const user = await ally.driver('google').getUser()
  return user
})


Route
  .group(() => {
    //rotas de controle geral do sistema
    Route.resource('order', 'OrderController').apiOnly()
    Route.resource('product', 'ProductController').apiOnly()
    Route.resource('category', 'CategoryController').apiOnly()
    Route.resource('user', 'UserController').apiOnly()

    //rotas de cadastro e index de imagens 
    Route.post('/product/:id/images', 'ImageProductController.store')
    Route.post('/category/:id/images', 'ImageCategoryController.store')
    Route.post('/user/:id/images', 'ImageUserController.store')
}).prefix('auth').middleware(['auth'])

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
