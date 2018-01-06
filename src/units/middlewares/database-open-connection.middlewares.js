const MongodbConnection = require('../database/mongodb-connection.js')

const databaseConnection = async ( req, res, next ) => {
  req.$connection = await MongodbConnection( req.header('host') )
  next()
}

module.exports = databaseConnection
