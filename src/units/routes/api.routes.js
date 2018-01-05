const RoutesFactory = require('../../support/inHouseFunctions/routesFactory.js')
const LoadRoutesByPath = require('../../support/inHouseFunctions/loadRoutesByPath.js')
const Path = require('path')
const route = Path.basename( __filename ).split('.')[0]
const { pick } = require( 'lodash' )

const index = ( req, res, next ) =>
  res.send( ` Try a http get at /api to see the routes :) ` )

const getDomain = ( from, domain ) => from[ domain ].split(':')[ 0 ]

const getRoutesByDomain = async ( routes ) => {
  const separetedRoutes = { }
  await routes.map( route => {
    const currentDomain = getDomain(  route, 'name' )
    if ( !separetedRoutes[ currentDomain.toString() ] ) {
      separetedRoutes[ currentDomain.toString() ] = [ pick( route, ['path', 'name', 'version'] ) ]
    }
    else {
       separetedRoutes[ currentDomain ].push( pick( route, ['path', 'name', 'version'] ) )
    }
  })
  return separetedRoutes
}

const getAll = async ( req, res, next ) => {
  const routes =
    await getRoutesByDomain( LoadRoutesByPath( Path.join( __dirname, '../routes' ) ) )

  res.send( 200, routes )
}

const routes = [
    RoutesFactory('get', `/`, `${route}:index`, '0.0.1', index)
  , RoutesFactory('get', `/${route}`, `${route}:getAll`, '0.0.1', getAll)
]

module.exports = routes
