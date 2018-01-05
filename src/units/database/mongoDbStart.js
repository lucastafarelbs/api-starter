const MongoDB = require('./mongoDb.js')
const MongoDBConnections = require('./mongoDbConnections.js')
const startNewConnection = ( connection ) => {
  
  return MongoDB.start( connection, MongoDBConnections[ connection ] )
}

module.exports = startNewConnection
