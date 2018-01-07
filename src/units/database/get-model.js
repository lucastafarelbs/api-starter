const Mongoose = require( 'mongoose' )
const Schema = Mongoose.Schema
const { capitalize } = require( 'lodash' )

const getModelSchema = modelToGet => {
  const model = require(`../../domains/models/${modelToGet}.models.js`)
  return new Schema( model )
}

const getSingularCollectionName = ( modelName ) =>
  capitalize( modelName ).slice( 0, modelName.length - 1 )

const getModel = ( connection, modelToGet ) =>
  connection.model( getSingularCollectionName( modelToGet ),  getModelSchema( modelToGet ) )

module.exports = getModel
