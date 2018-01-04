'use strict';

const Server = require('./src/units/server/server.js')
const Database = require('./src/units/database/database.js')

const init = async () => {
  try {
    await Server.start()
    await Database.start()
  } catch ( err ) {
    console.log( 'An error has occurred when trying to initialize the API: ', err )
  }
}

init()
