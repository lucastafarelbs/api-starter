'use strict'
const RoutesFactory = require('../../support/inHouseFunctions/routesFactory.js')
const Path = require('path')

const getAll = (req, res, next) => { res.send('get /others' ) }
const create = (req, res, next) => { res.send('post /others' ) }
const getById = (req, res, next) => { res.send('get /others/' + req.params.id ) }
const updateById = (req, res, next) => { res.send('put /others' + req.params.id ) }
const deleteById = (req, res, next) => { res.send('del /others' + req.params.id ) }

const route = Path.basename(__filename).split('.')[0]

const routes = [
  RoutesFactory( 'post', `/${route}`,     `${route}:getAll`, '0.0.1', create ),
  RoutesFactory( 'get',  `/${route}`,     `${route}:create`, '0.0.1', getAll ),
  RoutesFactory( 'get',  `/${route}/:id`, `${route}:getById`, '0.0.1', getById ),
  RoutesFactory( 'put',  `/${route}/:id`, `${route}:updateById`, '0.0.1', updateById ),
  RoutesFactory( 'del',  `/${route}/:id`, `${route}:deleteById`, '0.0.1', deleteById ),
]

module.exports = routes
