'use strict'
const Path = require('path')
const Fs = require('fs')
const thisUnit = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisRoute = Path.basename(__filename).split('.')[0]
const thisHandlers = require(`../handlers/${thisRoute}.handlers.js`)
const DatabaseCloseConnectionMiddleware = require('../../../middlewares/database-close-connection.middlewares.js')

const getValidations = Fs.existsSync( Path.join( __dirname, `../../../domains/${thisRoute}/validations/get.validations.js` ) )
  ? require(`../../../domains/users/validations/get.validations.js`)
  : {}

const route = {
    method:  'get'
  , path: `/${ thisUnit }`
  , name: `${ thisUnit }:${ thisRoute }`
  , version:  '0.0.1'
  , handler:  [ thisHandlers.getAll, DatabaseCloseConnectionMiddleware ]
  , validate:  {}
  , needAuth: false
}

module.exports = route
