const TodosBusinessRules = require('../../domains/todos/business-rules.js')

const create = (req, res, next) => {
  TodosBusinessRules.create( req.$connection, req.body )
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
  TodosBusinessRules.getAll( req.$connection, query, options )
     .then(docs => res.send( 200, docs || [] ) )
     .catch(err => res.send( 500, err ) )

  next()
}

const getById =  (req, res, next) => {
  const query = ( { _id: req.params.id } )

  TodosBusinessRules.getById( req.$connection, query )
    .then(docs => res.send( 200, docs || {} ) )
    .catch(err => res.send( 500, err ) )

  next()
}

const updateById = (req, res, next) => {
  const condition = {
    _id: req.params.id
  }

  TodosBusinessRules.updateById( req.$connection, condition, req.body )
    .then( ( doc ) => res.send( 200 , { newValues: doc } ) )
    .catch( err => {
      res.send( 500, err )
    } )
  next()
}

const deleteById = (req, res, next) => {
  const query = { _id: req.params.id }
  TodosBusinessRules.deleteById( req.$connection, query )
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
