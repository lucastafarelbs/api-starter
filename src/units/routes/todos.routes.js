'use strict'
const TodosHandlers = require('../handlers/todos.handlers.js')
const RoutesFactory = require('../../support/inHouseFunctions/routesFactory.js')

const routes = [
   RoutesFactory.create( 'get', '/todos', 'getAll', '0.0.1', TodosHandlers.getAll ),
   RoutesFactory.create( 'post', '/todos', 'create', '0.0.1', TodosHandlers.create ),
   RoutesFactory.create( 'get',  '/todos/:id', 'getById', '0.0.1', TodosHandlers.getById ),
   RoutesFactory.create( 'put',  '/todos/:id', 'updateById', '0.0.1', TodosHandlers.updateById ),
   RoutesFactory.create( 'del',  '/todos/:id', 'deleteById', '0.0.1', TodosHandlers.deleteById ),
]

module.exports  = routes
