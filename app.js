'use strict';

const Server = require('./src/server/server.js')

const init = async () => {
  try {
    await Server.start()
  } catch ( err ) {
    console.log( 'An error has occurred when trying to initialize the API: ', err )
  }
}

init()
