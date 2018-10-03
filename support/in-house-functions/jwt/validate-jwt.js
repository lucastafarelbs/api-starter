const JsonWebToken = require('jsonwebtoken')

const dataIsValid= ( data ) => ( data && data.secret && data.token )

const validateToken = ( data ) => {
  if ( !dataIsValid( data ) )
    throw new Error('tokenValidateError: Data object is malformed')
  try {
    JsonWebToken.verify( data.token, data.secret )
    return true
  } catch (e) {
    return false
  }
}

module.exports = validateToken
