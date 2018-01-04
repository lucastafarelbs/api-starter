const DotEnv = require('dotenv').config()
const Restify = require('restify')

const serverOptions = {
    name: process.env.SERVER_NAME || 'api-starter'
  , host: process.env.SERVER_HOST || 'localhost'
  , port: process.env.SERVER_PORT || '5550'
}

const server = Restify.createServer( serverOptions )

function respond(req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

server.get('/hello/:name', respond)

const start = () => {
  try {
    server.listen(serverOptions.port, serverOptions.host, () => console.log(`server ${server.name} listening at ${server.url}`) )
  }
  catch( err ) {
    console.log( 'an error has ocurred when trying to start the server :(', err )
  }
}

module.exports = {
  start
}
