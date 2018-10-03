const Mongoose = require( 'mongoose' )
const Schema = Mongoose.Schema
const { capitalize } = require( 'lodash' )
const Path = require('path')

const getModelSchema = modelToGet => {
  const model = require(`./${modelToGet}.models.js`)( Schema )
  return new Schema( model, {timestamps: true} )
}

const getSingularCollectionName = ( modelName ) =>
  ( modelName ) ? modelName.slice( 0, modelName.length - 1 ) : ''

const getModel = ( connection, modelToGet = '' ) => {
  const singularModelName = getSingularCollectionName( modelToGet )
  const capitalizedModelName = capitalize( singularModelName )

  return ( connection && connection.models && connection.models[ capitalizedModelName ] )
    ? connection.models[ capitalizedModelName ]
    : connection.model( capitalizedModelName,  getModelSchema( singularModelName.toLowerCase() ) )
}

module.exports = getModel
