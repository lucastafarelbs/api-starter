'use strict'
const Path = require('path')
const Fs = require('fs')
const Joi = require('joi')
const thisUnit = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisRoute = Path.basename(__filename).split('.')[0]
const thisHandlers = require(`../handlers/${thisRoute}.handlers.js`)
const DatabaseCloseConnectionMiddleware = require('../../../middlewares/database-close-connection.middlewares.js')

const route = {
    method: 'put'
  , path: `/${ thisUnit }/:id`
  , name: `${ thisUnit }:${ thisRoute }`
  , version: '0.0.1'
  , handler: [ thisHandlers.updateById,  DatabaseCloseConnectionMiddleware ]
  , validate: {}
  , needAuth: true
}

module.exports = route
