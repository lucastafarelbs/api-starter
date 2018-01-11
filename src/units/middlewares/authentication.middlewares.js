const GetModel = require('../../domains/models/get-model.js')
const ValidateJwt = require('../../support/in-house-functions/jwt/validate-jwt.js')
const MongoDbCrudFunctions = require('../../support/database/mongodb-crud-functions.js')

const authenticate = ( req, res, next ) => {
  if ( !req.route.needAuth )
    return next()

  const AuthModel = GetModel( req.$connection, 'Authentications')
  const reqToken = ( req && req.headers && req.headers.authorization )
    ? req.headers.authorization.replace('Bearer ', '') : ''

  if ( !reqToken ){
    const errorMessage = 'authError: token is required.'
    console.log( errorMessage )
    res.send( 500, errorMessage )
    return next( false )
  }

  const validateObject = { token: reqToken, secret: req.$client.apiSecret  }
  if ( !ValidateJwt( validateObject ) ){
    const errorMessage = 'authError: invalid token.'
    console.log( errorMessage )
    res.send( 500, errorMessage )
    return next( false )
  }

  const authenticationSuccess = authentication => {
    req.$token = authentication.token
    next()
  }
  const authenticationError = err => {
    const errorMessage = 'authError: this token is not active.'
    console.log( errorMessage )
    res.send( 500, errorMessage )
    return next( false )
  }

  MongoDbCrudFunctions.getDoc( AuthModel, [{ token: reqToken }] )
  .then( authenticationSuccess )
  .catch( authenticationError )
}
module.exports = authenticate
