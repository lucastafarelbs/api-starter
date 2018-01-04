const DotEnv = require('dotenv').config()
const Restify = require('restify')

const serverOptions = {
    name: process.env.SERVER_NAME || 'api-starter'
  , host: process.env.SERVER_HOST || 'localhost'
  , port: process.env.SERVER_PORT || '5550'
}

const server = Restify.createServer( serverOptions )
server.use(Restify.plugins.bodyParser({ mapParams: true }))
server.use(Restify.plugins.acceptParser(server.acceptable))
server.use(Restify.plugins.queryParser({ mapParams: true }))

const Path = require('path')
const RegisterRoutesByPath = require( '../../support/inHouseFunctions/registerRoutesByPath.js' )
const registeredRoutes = RegisterRoutesByPath( server, Path.join( __dirname, '../routes' ) )
const DisplayRegisteredRoutes = require( '../../support/inHouseFunctions/displayRegisteredRoutes.js' )
DisplayRegisteredRoutes( registeredRoutes )

const start = () => {
  try {
    server.listen(serverOptions.port, serverOptions.host, () => {
      console.log(`server ${server.name} listening at ${server.url}`)
    })
  }
  catch( err ) {
    console.log( 'an error has ocurred when trying to start the server :(', err )
  }
}

module.exports = { start }
