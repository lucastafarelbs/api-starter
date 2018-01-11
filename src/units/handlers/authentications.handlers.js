const Path = require('path')
const thisHandler = Path.basename( __filename.split('.')[0] )
const BusinessRules = require(`../../domains/${thisHandler}/business-rules.js`)
const GetModel = require('../../domains/models/get-model.js')

const login = async (req, res, next) => {
  await BusinessRules.login( req, res )
}

const logout = (req, res, next) => {
  const query = { token: req.$token }
  BusinessRules.logout( GetModel( req.$connection, 'authentications' ), query )
  .then( doc => res.send( 200, {message: 'Goodbye :)'} ) )
  .catch( err => res.send( 500, err ) )

  next()
}

module.exports = { login, logout }
