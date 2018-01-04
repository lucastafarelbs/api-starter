const TodoModel = require('./model.js')
const DbFunctions = require('../../support/inHouseFunctions/dbFunctions.js')

const create = ( data ) => {
  const toInsert = Object.assign( {}, data, { createdAt: new Date() } )
  return dbFunctions.create( TodoModel, toInsert )
}

const getAll = ( query, options ) => DbFunctions.getAll( TodoModel, query, options )

const getById = ( query ) => DbFunctions.getById( TodoModel, query )

const updateById = ( query, data ) => {
  const toUpdate = Object.assign( {}, data, {
    updatedAt: new Date()
  })
  const newValues  = { $set: toUpdate }

  return DbFunctions.updateById( TodoModel, query, newValues)
}

const deleteById = ( query ) => DbFunctions.deleteById( TodoModel, query )

module.exports = { create, getAll, getById, updateById, deleteById }
