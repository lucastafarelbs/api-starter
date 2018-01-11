'use strict'
const Path = require('path')
const Fs = require('fs')
const Joi = require('joi')
const thisRoute = Path.basename(__filename).split('.')[0]
const thisHandlers = require(`../handlers/${thisRoute}.handlers.js`)
const RoutesFactory = require('../../support/in-house-functions/routes-factory.js')

const DatabaseCloseConnectionMiddleware = require('../middlewares/database-close-connection.middlewares.js')

const createValidations = Fs.existsSync( Path.join( __dirname, `../../domains/${thisRoute}/validations/create.validations.js` ) )
  ? require(`../../domains/users/validations/create.validations.js`)
  : {}

const udpdateByIdValidations = Fs.existsSync( Path.join( __dirname, `../../domains/${thisRoute}/validations/update-by-id.validations.js` ) )
  ? require(`../../domains/users/validations/update-by-id.validations.js`)
  : {}

const routes = [
  RoutesFactory( 'get',  `/${thisRoute}`,     `${thisRoute}:getAll`, '0.0.1', [ thisHandlers.getAll, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'post', `/${thisRoute}`,     `${thisRoute}:create`, '0.0.1', [ thisHandlers.create, DatabaseCloseConnectionMiddleware ], createValidations ),
  RoutesFactory( 'get',  `/${thisRoute}/:id`, `${thisRoute}:getById`, '0.0.1', [ thisHandlers.getById, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'put',  `/${thisRoute}/:id`, `${thisRoute}:updateById`, '0.0.1', [ thisHandlers.updateById, DatabaseCloseConnectionMiddleware ] ),
  RoutesFactory( 'del',  `/${thisRoute}/:id`, `${thisRoute}:deleteById`, '0.0.1', [ thisHandlers.deleteById, DatabaseCloseConnectionMiddleware ] )
]

module.exports = routes
