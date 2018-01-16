const DotEnv = require('dotenv').config()
const Restify = require('restify')
const Joi = require('joi')
const Path = require('path')
const Package = require('../../../package.json')

const serverOptions = {
    name: process.env.SERVER_NAME || Package.name
  , host: process.env.SERVER_HOST || 'localhost'
  , port: process.env.SERVER_PORT || '5550'
}

const createServer = ( serverOptions ) => {
  const server = Restify.createServer( serverOptions )
  server.use( Restify.plugins.bodyParser( { mapParams: true } ) )
  server.use( Restify.plugins.acceptParser( server.acceptable ) )
  server.use( Restify.plugins.queryParser( { mapParams: true } ) )
  server.use( Restify.plugins.gzipResponse( ) )

  const getClientMiddleware = require('../middlewares/get-client.middlewares.js')
  server.use( getClientMiddleware )

  const DatabaseOpenConnectionMiddleware = require('../middlewares/database-open-connection.middlewares.js')
  server.use( DatabaseOpenConnectionMiddleware )

  const authenticationMiddleware = require('../middlewares/authentication.middlewares.js')
  server.use( authenticationMiddleware )

  const validationMiddleware = require('../middlewares/validation.middlewares.js')
  server.use( validationMiddleware )

  const RegisterRoutesByPath = require( '../../support/in-house-functions/routes-manager/register-routes-by-path.js' )
  const registeredRoutes = RegisterRoutesByPath( server, Path.join( __dirname, '../' ) )

  server.get('/', (req, res, next) => {
    res.send(`Everything's OK. ${ server.name } is started, enjoy it :)`)
    next()
  })

  if ( process.env.SERVER_ROUTES_ON_CONSOLE && ( process.env.SERVER_ROUTES_ON_CONSOLE.toString() == 'true' ) ) {
    const DisplayRegisteredRoutes = require( '../../support/in-house-functions/routes-manager/display-registered-routes.js' )
    DisplayRegisteredRoutes( registeredRoutes )
  }

  return server
}

const start = () => {
  try {
    const server = createServer( serverOptions )
    server.listen(serverOptions.port, serverOptions.host, () => {
      console.log(`Server ${server.name} listening at ${server.url}`)
    })
  }
  catch( err ) {
    console.log( 'an error has ocurred when trying to start the server :(', err )
  }
}

module.exports = { start }
