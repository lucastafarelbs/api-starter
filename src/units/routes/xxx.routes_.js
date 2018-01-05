'use strict'
const RoutesFactory = require('../../support/inHouseFunctions/routesFactory.js')

const getAll = (req, res, next) => { res.send('get /xxx' ) }
const create = (req, res, next) => { res.send('post /xxx' ) }
const getById = (req, res, next) => { res.send('get /xxx/' + req.params.id ) }
const updateById = (req, res, next) => { res.send('put /xxx' + req.params.id ) }
const deleteById = (req, res, next) => { res.send('del /xxx' + req.params.id ) }

const routes = [
  RoutesFactory( 'post', '/xxx', 'create', '0.0.1', create ),
  RoutesFactory( 'get', '/xxx', 'getAll', '0.0.1', getAll ),
  RoutesFactory( 'get',  '/xxx/:id', 'getById', '0.0.1', getById ),
  RoutesFactory( 'put',  '/xxx/:id', 'updateById', '0.0.1', updateById ),
  RoutesFactory( 'del',  '/xxx/:id', 'deleteById', '0.0.1', deleteById ),
]

module.exports = routes
