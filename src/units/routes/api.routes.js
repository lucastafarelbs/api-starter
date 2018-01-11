const RoutesFactory = require('../../support/in-house-functions/routes-factory.js')
const Path = require('path')
const thisRoute = Path.basename(__filename).split('.')[0]
const thisHandlers = require(`../handlers/${thisRoute}.handlers.js`)

const routes = [
    RoutesFactory('get', `/`, `${thisRoute}:index`, '0.0.1', thisHandlers.index, {}, 'false')
  , RoutesFactory('get', `/${thisRoute}`, `${thisRoute}:getAll`, '0.0.1', thisHandlers.getAll, {}, false)
]

module.exports = routes
