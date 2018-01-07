const MongodbCrudFunctions = require('../../support/database/mongodb-crud-functions.js')

const create = ( model, data ) => {
  const toInsert = Object.assign( {}, data, { createdAt: new Date() } )
  return MongodbCrudFunctions.create( model, toInsert )
}

const get = (model, query, options ) => MongodbCrudFunctions.get( model, query, options )

const getById = (model, query ) => MongodbCrudFunctions.getById( model, query )

const updateById = (model, query, data ) => {
  const toUpdate = Object.assign( {}, data, { updatedAt: new Date() } )
  const newValues  = { $set: toUpdate }

  return MongodbCrudFunctions.updateById( model, query, newValues)
}

const deleteById = (model, query ) => MongodbCrudFunctions.deleteById( model, query )

module.exports = { create, get, getById, updateById, deleteById }
