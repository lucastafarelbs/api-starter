const JsonWebToken = require('jsonwebtoken')

const options = {
  algorithm: 'HS256',
  expiresIn: '7d'
}

const dataIsValid= ( data ) => ( data && data.secret && data.payload && Object.keys( data.payload ).length )

const generateToken = ( data ) => {
  if ( !dataIsValid( data ) )
    throw new Error('tokenGenerateError: Data object is malformed')

  return JsonWebToken.sign( data.payload, data.secret, options)
}

module.exports = generateToken
