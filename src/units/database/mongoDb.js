const Mongoose = require('mongoose')

const connectionError = ( name ) => ( err ) =>
  console.log(`An error has occurred when trying to start the ${name} MongoDB Database.`, err )

const connectionSuccess = ( name ) => ( database ) => {
  console.log( `MongoDB server ${name} is connected  :)` )
}

const start = ( name, uri ) => {
  const conn = Mongoose.createConnection( uri, {  poolSize: 5 } )
  conn.on('error', connectionError( name ) )
  conn.once('open', connectionSuccess( name ) )
  return conn
}

module.exports = { start }
