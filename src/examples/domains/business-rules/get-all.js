const GetModel = require('../../../models/get-model.js')

const getAll = async ( req, query={}, options ) => {
  const model = GetModel( req.$connection, req.$model )
  const docs = await model.find( query )
  return docs || []
}

module.exports = { getAll }
