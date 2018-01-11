const { table } = require('table')
const head = [
  'method',
  'path',
  'name',
  'version',
  'authenticate'
]

const routeToRow = route => {
  const { method, path, name, version, needAuth } = route
  return ([ method, path, name, version, needAuth ])
}

const parseRoutesToRows = routes => {
  const rows = routes.map( routeToRow )
  return [ head, ...rows ]
}

const displayRegisteredRoutes = routes => {
  const rows = parseRoutesToRows(routes)

  console.log( table(rows) )
}

module.exports = displayRegisteredRoutes
