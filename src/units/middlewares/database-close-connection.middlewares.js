const databaseCloseConnection = ( req, res, next ) => {
  if ( req.$connection && req.$connection.db && req.$connection.db._events )
    req.$connection.db._events.close()

  next()
}

module.exports = databaseCloseConnection
