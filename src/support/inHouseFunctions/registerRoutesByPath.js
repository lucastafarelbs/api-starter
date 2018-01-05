const { pick } = require('lodash')
const LoadRoutesByPath = require('./loadRoutesByPath')
const DisplayRegisteredRoutes = require('../../support/inHouseFunctions/displayRegisteredRoutes.js')

const registerRoutesByPath = (server, dirName) => {
  const routes = LoadRoutesByPath(dirName)

  return routes.map( route => {
    const { method, handler } = route
    const opts = pick(route, ['path', 'name', 'version'])

    server[method](opts, handler)
    return route
  })
}

module.exports = registerRoutesByPath
