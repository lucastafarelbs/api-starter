const MongoDbFunctions = require('../../support/database/mongoDbFunctions.js')
const CreateModel = require('./createModel.js')

const create = (connection, data ) => {
  const toInsert = Object.assign( {}, data, { createdAt: new Date() } )
  return MongoDbFunctions.create( CreateModel(connection), toInsert )
}

const getAll = (connection, query, options ) => MongoDbFunctions.getAll( CreateModel(connection), query, options )

const getById = (connection, query ) => MongoDbFunctions.getById( CreateModel(connection), query )

const updateById = (connection, query, data ) => {
  const toUpdate = Object.assign( {}, data, {
    updatedAt: new Date()
  })
  const newValues  = { $set: toUpdate }

  return MongoDbFunctions.updateById( CreateModel(connection), query, newValues)
}

const deleteById = (connection, query ) => MongoDbFunctions.deleteById( CreateModel(connection), query )

module.exports = { create, getAll, getById, updateById, deleteById }
