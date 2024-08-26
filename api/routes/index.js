const express = require('express');

const productsRouter = require('./productsRoutes')
const categoriesRouter = require('./categoriesRoutes')
const usersRouter = require('./usersRoutes')
const customersRouter = require('./customersRoutes')
const ordersRouter = require('./ordersRoutes')




function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router)

  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
  router.use('/users', usersRouter)
  router.use('/customers', customersRouter)
  router.use('/orders', ordersRouter)


}

module.exports = routerApi
