const DotEnv = require('dotenv')
const Clients = require('../../.clients.js')

const getClient = ( req, res, next ) => {
  const client =  req.header( 'client' ) ?  req.header( 'client' ) : process.env.SERVER_DEFAULT_CLIENT
  req.$client = ( Clients[ client ] ) ? Clients[ client ]: {}

  if ( !req.$client || !Object.keys( req.$client ).length ) {
    res.send( 500, 'ClientError: This client doesn\'t exists.')
    return next( false )
  }

  if ( !req.$client.status ) {
    res.send( 500, 'ClientError: This client is not active.')
    return next( false )
  }

  if ( !req.$client.dbHost ) {
    res.send( 500, 'ClientError: Host to database was not found for this client.')
    return next( false )
  }

  next()
}

module.exports = getClient
