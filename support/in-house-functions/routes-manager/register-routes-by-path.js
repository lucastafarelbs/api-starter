const { pick } = require('lodash')
const LoadRoutesByPath = require('./load-routes-by-path.js')
const DotEnv = require('dotenv')

const registerRoutesByPath = (server, dirName) => {
  const routes = LoadRoutesByPath(dirName)

  const apiVersion = process.env.SERVER_API_VERSION || '/api/v1'

  return routes.map( route => {
    const { method, handler } = route
    route.path = apiVersion + route.path
    const opts = pick(route, ['path', 'name', 'version', 'validate', 'needAuth'])

    server[method](opts, handler)
    return route
  })
}

module.exports = registerRoutesByPath
