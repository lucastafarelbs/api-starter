const GetModel = require('../../../../models/get-model.js')

const getById = async ( req, query, options ) => {
  const model = GetModel( req.$connection, req.$model )

  const doc = ( query._id ) ? await model.findOne( query ) : ''
  return doc || {}
}

module.exports = { getById }
