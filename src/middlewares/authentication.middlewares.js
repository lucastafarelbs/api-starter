const GetModel = require('../get-model.js')
const ValidateJwt = require('../../support/in-house-functions/jwt/validate-jwt.js')

const authenticate = async ( req, res, next ) => {
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

  const authentication = await AuthModel.findOne({ token: reqToken })
  if ( !authentication ){
    const errorMessage = 'authError: this token is not active.'
    res.send( 500, errorMessage )
    return next( false )
  }

  req.$token = authentication.token
  next()
}
module.exports = authenticate
