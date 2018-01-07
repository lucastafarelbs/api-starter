'use strict'
const Path = require('path')
const thisRoute = Path.basename(__filename).split('.')[0]
const thisHandlers = require(`../handlers/${thisRoute}.handlers.js`)
const RoutesFactory = require('../../support/in-house-functions/routes-factory.js')

const DatabaseOpenConnectionMiddleware = require('../middlewares/database-open-connection.middlewares.js')
const DatabaseCloseConnectionMiddleware = require('../middlewares/database-close-connection.middlewares.js')

const routes = [
  RoutesFactory( 'get',  `/${thisRoute}`,     `${thisRoute}:getAll`, '0.0.1', [ DatabaseOpenConnectionMiddleware, thisHandlers.getAll, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'post', `/${thisRoute}`,     `${thisRoute}:create`, '0.0.1', [ DatabaseOpenConnectionMiddleware, thisHandlers.create, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'get',  `/${thisRoute}/:id`, `${thisRoute}:getById`, '0.0.1', [ DatabaseOpenConnectionMiddleware, thisHandlers.getById, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'put',  `/${thisRoute}/:id`, `${thisRoute}:updateById`, '0.0.1', [ DatabaseOpenConnectionMiddleware, thisHandlers.updateById, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'del',  `/${thisRoute}/:id`, `${thisRoute}:deleteById`, '0.0.1', [ DatabaseOpenConnectionMiddleware, thisHandlers.deleteById, DatabaseCloseConnectionMiddleware ] ),
]

module.exports = routes
