const Mongoose = require('mongoose')

const start = ( uri ) => {
  const connectionError = ( err ) =>
    console.log(`An error has occurred when trying to start the MongoDB Database for URI:\n${ uri }`, err )

  const conn = Mongoose.createConnection( uri, {  poolSize: 5 } )
  conn.on('error', connectionError )
  return conn
}

const databaseConnection = async ( req, res, next ) => {

  const connection = await start( req.$client.dbHost )

  if ( ( connection instanceof Error ) || !connection ){
    const errorObject = {
        clientError: req$client
      , message: connection.message || 'An error has occurred when trying to start the Database'
    }

    res.send( 500, errorObject )
    return next( false )
  }

  req.$connection = connection
  next()
}

module.exports = databaseConnection
