const Mongoose = require( 'mongoose' )
const Schema = Mongoose.Schema
const { capitalize } = require( 'lodash' )
const Path = require('path')

const getModelSchema = modelToGet => {
  const model = require(`./${modelToGet}.models.js`)( Schema )
  return new Schema( model )
}

const getSingularCollectionName = ( modelName ) =>
  capitalize( modelName ).slice( 0, modelName.length - 1 )

const getModel = ( connection, modelToGet = '' ) => {

  const modelName = getSingularCollectionName( modelToGet )

  return ( connection && connection.models && connection.models[ modelName ] )
    ? connection.models[ modelName ]
    : connection.model( modelName,  getModelSchema( modelToGet.toLowerCase() ) )
}

module.exports = getModel
