'use strict'
const TodosHandlers = require('../handlers/todos.handlers.js')
const RoutesFactory = require('../../support/inHouseFunctions/routes-factory.js')
const Path = require('path')
const route = Path.basename(__filename).split('.')[0]

const DatabaseOpenConnectionMiddleware = require('../middlewares/database-open-connection.middlewares.js')
const DatabaseCloseConnectionMiddleware = require('../middlewares/database-close-connection.middlewares.js')

const routes = [
  RoutesFactory( 'get',  `/${route}`,     `${route}:getAll`, '0.0.1', [ DatabaseOpenConnectionMiddleware, TodosHandlers.getAll, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'post', `/${route}`,     `${route}:create`, '0.0.1', [ DatabaseOpenConnectionMiddleware, TodosHandlers.create, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'get',  `/${route}/:id`, `${route}:getById`, '0.0.1', [ DatabaseOpenConnectionMiddleware, TodosHandlers.getById, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'put',  `/${route}/:id`, `${route}:updateById`, '0.0.1', [ DatabaseOpenConnectionMiddleware, TodosHandlers.updateById, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'del',  `/${route}/:id`, `${route}:deleteById`, '0.0.1', [ DatabaseOpenConnectionMiddleware, TodosHandlers.deleteById, DatabaseCloseConnectionMiddleware ] ),
]

module.exports = routes
