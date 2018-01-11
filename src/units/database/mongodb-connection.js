const Mongoose = require('mongoose')

const connectionError = (uri) => ( err ) =>
  console.log(`An error has occurred when trying to start the MongoDB Database for URI:\n${ uri }`, err )

const start = ( uri ) => {
  const conn = Mongoose.createConnection( uri, {  poolSize: 5 } )
  conn.on('error', connectionError( uri ) )
  return conn
}

module.exports = start
