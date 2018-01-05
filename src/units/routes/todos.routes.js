'use strict'
const TodosHandlers = require('../handlers/todos.handlers.js')
const RoutesFactory = require('../../support/inHouseFunctions/routesFactory.js')
const Path = require('path')
const route = Path.basename(__filename).split('.')[0]

const MongoDbStart = require('../database/mongoDbStart.js')

const middlewareGetConnection = async ( req, res, next ) => {
  req.$connection = await MongoDbStart( req.header('host') )
  next()
}

const routes = [
  RoutesFactory( 'get',  `/${route}`,     `${route}:getAll`, '0.0.1', [ middlewareGetConnection, TodosHandlers.getAll ] ),
  RoutesFactory( 'post', `/${route}`,     `${route}:create`, '0.0.1', [ middlewareGetConnection, TodosHandlers.create ] ),
  RoutesFactory( 'get',  `/${route}/:id`, `${route}:getById`, '0.0.1', [ middlewareGetConnection, TodosHandlers.getById ] ),
  RoutesFactory( 'put',  `/${route}/:id`, `${route}:updateById`, '0.0.1', [ middlewareGetConnection, TodosHandlers.updateById ] ),
  RoutesFactory( 'del',  `/${route}/:id`, `${route}:deleteById`, '0.0.1', [ middlewareGetConnection, TodosHandlers.deleteById ] ),
]

module.exports = routes
