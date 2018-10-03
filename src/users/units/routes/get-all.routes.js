'use strict'
const Path = require('path')
const Fs = require('fs')
const thisUnit = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisRoute = Path.basename(__filename).split('.')[0]
const thisHandlers = require(`../handlers/${thisRoute}.handlers.js`)
const DatabaseCloseConnectionMiddleware = require('../../../middlewares/database-close-connection.middlewares.js')

const pathToValidations =  `../../../domains/${thisUnit}/validations/get.validations.js`
const getValidations = Fs.existsSync( Path.join( __dirname, pathToValidations ) )
  ? require( pathToValidations )
  : {}

const route = {
    method:  'get'
  , path: `/${ thisUnit }`
  , name: `${ thisUnit }:${ thisRoute }`
  , version:  '0.0.1'
  , handler:  [ thisHandlers.getAll, DatabaseCloseConnectionMiddleware ]
  , validate:  getValidations
  , needAuth: true
}

module.exports = route
