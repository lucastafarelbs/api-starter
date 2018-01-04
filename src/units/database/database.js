const Mongoose = require('mongoose')
const DotEnv = require('dotenv')

const connections = {
    'development': process.env.DB_HOST_DEVELOPMENT
  , 'production': process.env.DB_HOST_PRODUCTION
}

const connectionError = ( err ) =>
  console.log('An error has occurred when trying to start the MongoDB Database.', err )

const connectionSuccess = ( ) =>
  console.log( `Everything's ok with the database, it's connected :)` )

const start = () => {
  Mongoose.connect(connections['development'])
  Mongoose.Promise = global.Promise
  const db = Mongoose.connection
  db.on('error', connectionError )
  db.once('open', connectionSuccess )
}

module.exports = { start }
