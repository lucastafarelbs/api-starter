const Path = require('path')
const thisHandler = Path.basename( __filename.split('.')[0] )
const BusinessRules = require(`../../domains/${thisHandler}/business-rules.js`)
const GetModel = require('../../domains/models/get-model.js')

const login = async (req, res, next) => {
  try {
    const token = await BusinessRules.login( req, res, next )
    res.send(200, { token })
    next()
  } catch (e) {
    console.log( 'error: \n', e);
    res.send( 500, e.message )
    next( false )
  }
}

const logout = (req, res, next) => {
  const query = { token: req.$token }
  BusinessRules.logout( GetModel( req.$connection, 'authentications' ), query )
  .then( doc => res.send( 200, {message: 'Goodbye :)'} ) )
  .catch( err => res.send( 500, err ) )

  next()
}

module.exports = { login, logout }
