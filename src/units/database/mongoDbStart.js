const MongoDB = require('./mongoDb.js')
const MongoDBConnections = require('./mongoDbConnections.js')

const startNewConnection = ( connection ) =>
  MongoDB.start( connection, MongoDBConnections[ connection ] )

module.exports = startNewConnection
