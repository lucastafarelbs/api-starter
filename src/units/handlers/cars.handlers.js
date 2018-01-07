const Path = require('path')
const thisModel = Path.basename( __filename.split('.')[0] )
const BusinessRules = require(`../../domains/${thisModel}/business-rules.js`)
const GetModel = require('../database/get-model.js')

const create = (req, res, next) => {
  BusinessRules.create( GetModel( req.$connection, thisModel ), req.body )
  .then( createdDoc => res.send( 200, createdDoc )  )
  .catch(err => res.send(500, err))

  next()
}

const getAll = (req, res, next) => {
  const options = {
      limit:  parseInt(req.query.limit, 10) || 10
    , skip:  parseInt(req.query.skip, 10) || 0
  }
  delete req.query.skip
  delete req.query.limit
  const query = Object.assign( {}, req.query )
  BusinessRules.get( GetModel( req.$connection, thisModel ), query, options )
     .then(docs => res.send( 200, docs || [] ) )
     .catch(err => res.send( 500, err ) )

  next()
}

const getById =  (req, res, next) => {
  const query = ( { _id: req.params.id } )

  BusinessRules.getById( GetModel( req.$connection, thisModel ), query )
    .then(docs => res.send( 200, docs || {} ) )
    .catch(err => res.send( 500, err ) )

  next()
}

const updateById = (req, res, next) => {
  const condition = {
    _id: req.params.id
  }
  BusinessRules.updateById( GetModel( req.$connection, thisModel ), condition, req.body )
    .then( ( doc ) => res.send( 200 , { newValues: doc } ) )
    .catch( err => {
      res.send( 500, err )
    } )
  next()
}

const deleteById = (req, res, next) => {
  const query = { _id: req.params.id }
  BusinessRules.deleteById( GetModel( req.$connection, thisModel ), query )
  .then( doc => res.send( 204 ) )
  .catch( err => res.send( 500, err ) )

  next()
}

module.exports = {
    create
  , getAll
  , getById
  , updateById
  , deleteById
}
