const Mongoose = require('mongoose')
const MongodbDatabases = require('./mongodb-databases.js')
const DotEnv = require('dotenv')

const connectionError = ( name ) => ( err ) =>
  console.log(`An error has occurred when trying to start the ${name} MongoDB Database.`, err )

const start = ( name, uri ) => {
  const conn = Mongoose.createConnection( uri, {  poolSize: 5 } )
  conn.on('error', connectionError( name ) )
  return conn
}

const connection = ( connection ) => {
  if ( !connection )
    connection = process.env.DB_HOST_DEFAULT

  return start( connection, MongodbDatabases[ connection ] )
}

module.exports = connection
