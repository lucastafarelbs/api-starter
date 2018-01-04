'use strict'
const RoutesFactory = require('../../support/inHouseFunctions/routesFactory.js')

const getAll = (req, res, next) => { res.send('get /others' ) }
const create = (req, res, next) => { res.send('post /others' ) }
const getById = (req, res, next) => { res.send('get /others/' + req.params.id ) }
const updateById = (req, res, next) => { res.send('put /others' + req.params.id ) }
const deleteById = (req, res, next) => { res.send('del /others' + req.params.id ) }

const routes =
  [
     RoutesFactory.create( 'post', '/others', 'create', '0.0.1', create ),
     RoutesFactory.create( 'get', '/others', 'getAll', '0.0.1', getAll ),
     RoutesFactory.create( 'get',  '/others/:id', 'getById', '0.0.1', getById ),
     RoutesFactory.create( 'put',  '/others/:id', 'updateById', '0.0.1', updateById ),
     RoutesFactory.create( 'del',  '/others/:id', 'deleteById', '0.0.1', deleteById ),
  ]

module.exports = routes
