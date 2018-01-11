const MongodbConnection = require('../database/mongodb-connection.js')

const databaseConnection = async ( req, res, next ) => {

  const connection = await MongodbConnection( req.$client.dbHost )

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
