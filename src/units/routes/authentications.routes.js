'use strict'
const Path = require('path')
const Fs = require('fs')
const Joi = require('joi')
const thisRoute = Path.basename(__filename).split('.')[0]
const thisHandlers = require(`../handlers/${thisRoute}.handlers.js`)
const RoutesFactory = require('../../support/in-house-functions/routes-factory.js')

const DatabaseOpenConnectionMiddleware = require('../middlewares/database-open-connection.middlewares.js')
const DatabaseCloseConnectionMiddleware = require('../middlewares/database-close-connection.middlewares.js')

const routes = [
  RoutesFactory( 'post', `/${thisRoute}`,     `${thisRoute}:login`, '0.0.1', [ DatabaseOpenConnectionMiddleware, thisHandlers.login, DatabaseCloseConnectionMiddleware ], {}, false ),
  RoutesFactory( 'del',  `/${thisRoute}/:id`, `${thisRoute}:logout`, '0.0.1', [ DatabaseOpenConnectionMiddleware, thisHandlers.logout, DatabaseCloseConnectionMiddleware ], {}, true )
]

module.exports = routes
