'use strict'
const Path = require('path')
const Fs = require('fs')

const thisUnit = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisRoute = Path.basename( __filename ).split( '.' )[ 0 ]
const thisHandler = require(`../handlers/${ thisRoute }.handlers.js`)
const DatabaseCloseConnectionMiddleware = require('../../../middlewares/database-close-connection.middlewares.js')


const pathToValidation = `../domains/${thisUnit}/validations/${thisRoute}.validations.js`
const validations = Fs.existsSync( Path.join( __dirname, pathToValidation ) )
  ? require( pathToValidation )
  : {}

const route = {
    method: 'del'
  , path: `/${ thisUnit }`
  , name: `${ thisUnit }:${ thisRoute }`
  , version: '0.0.1'
  , handler: [ thisHandler.logout, DatabaseCloseConnectionMiddleware ]
  , validate: validations
  , needAuth: true
}

module.exports = route
