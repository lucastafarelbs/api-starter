const MongodbConnection = require('../database/mongodb-connection.js')

const databaseConnection = async ( req, res, next ) => {
  req.$connection = await MongodbConnection( req.header( 'db' ) )
  next()
}

module.exports = databaseConnection
