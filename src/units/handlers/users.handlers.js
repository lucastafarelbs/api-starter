const Path = require('path')
const thisModel = Path.basename( __filename.split('.')[0] )
const BusinessRules = require(`../../domains/${thisModel}/business-rules.js`)
const GetModel = require('../../domains/models/get-model.js')

const create = (req, res, next) => {
  BusinessRules
  .create( GetModel( req.$connection, thisModel ), req.body )
  .then( createdDoc => res.send( 200, createdDoc )  )
  .catch( err => res.send( 500, err.message ) )

  next()
}

const getAll = async (req, res, next) => {
  const options = {
      limit:  parseInt(req.query.limit, 10) || 10
    , skip:  parseInt(req.query.skip, 10) || 0
  }
  delete req.query.skip
  delete req.query.limit
  const query = { ...req.query }

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
  const query = {
    _id: req.params.id
  }
  BusinessRules
    .updateById( GetModel( req.$connection, thisModel ), query, req.body )
    .then( ( doc ) => {
      if ( !doc )
        return res.send( 404 , 'User Not Found' )

      return res.send( 200 , { newValues:  doc } )
    })
    .catch( err => {
      res.send( 500, err.message )
    } )
  next()
}

const deleteById = (req, res, next) => {
  const query = { _id: req.params.id }
  const updateUserToInactive = { status: false }
  BusinessRules.updateById( GetModel( req.$connection, thisModel ), query, updateUserToInactive )
  .then( doc => res.send( 200, {message:'Removed User.' } ) )
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
