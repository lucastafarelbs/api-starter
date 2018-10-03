const GetModel = require('../../../models/get-model.js')

const deleteById = async ( req, query ) => {
  const model = GetModel(req.$connection, req.$model)
  const foundUser = await model.findOne( query )
  if (!foundUser)
    throw new Error('userError: User Not Found.')
  return model.update( query, {status: false}, {multi: false} )
}
module.exports = { deleteById }
