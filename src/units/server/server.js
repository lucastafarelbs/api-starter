const DotEnv = require('dotenv').config()
const Restify = require('restify')
const Path = require('path')

const serverOptions = {
    name: process.env.SERVER_NAME || 'api-starter'
  , host: process.env.SERVER_HOST || 'localhost'
  , port: process.env.SERVER_PORT || '5550'
}

const createServer = ( serverOptions ) => {
  const server = Restify.createServer( serverOptions )
  server.use(Restify.plugins.bodyParser({ mapParams: true }))
  server.use(Restify.plugins.acceptParser(server.acceptable))
  server.use(Restify.plugins.queryParser({ mapParams: true }))

  const RegisterRoutesByPath = require( '../../support/inHouseFunctions/registerRoutesByPath.js' )
  const registeredRoutes = RegisterRoutesByPath( server, Path.join( __dirname, '../routes' ) )
  // const DisplayRegisteredRoutes = require( '../../support/inHouseFunctions/displayRegisteredRoutes.js' )
  // DisplayRegisteredRoutes( registeredRoutes )

  return server
}

const start = () => {
  try {
    const server = createServer( serverOptions )
    server.listen(serverOptions.port, serverOptions.host, () => {
      console.log(`Server ${server.name} listening at ${server.url}`)
      console.log(`See your routes requiring a get in ${server.url}/api`)
    })
  }
  catch( err ) {
    console.log( 'an error has ocurred when trying to start the server :(', err )
  }
}

module.exports = { start }
