const GetModel = require('../../../get-model.js')

const logout = async ( req, query ) => {
  const model = GetModel( req.$connection, req.$model )
  const authentication = await model.findOne( query )
  if ( !authentication )
    throw new Error('authenticationError: Authentication not found.')

  return model.remove( query )
}

module.exports = { logout }
