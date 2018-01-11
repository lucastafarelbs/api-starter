const createDoc = ( model, data ) => model.create( data )

const getDocs = ( model, query = {}, options = {} ) => {
  const formattedQuery = { ...query }['0'] || {}
  const fields = { ...query }['1'] || {}
  const page = options.limit * options.skip
  return model.find( formattedQuery, fields ).limit( options.limit ).skip( page ).exec()
}

const getDoc = ( model, query ) => {
  const formattedQuery = { ...query }['0'] || {}
  const fields = { ...query }['1'] || {}

  return model.findOne( formattedQuery, fields ).exec()
}

const updateDoc = ( model, query, newValues ) => {
  const formattedQuery = { ...query }['0'] || {}
  const fields = { ...query }['1'] || {}
  const options = {
      multi: false
    , returnOriginal: true
    , fields: fields
    , new: true
    , upsert: false
  }
  return model.findOneAndUpdate( formattedQuery, newValues, options )
}

const deleteDoc = ( model, query ) => model.remove( query )

const crudFunctions = {
    createDoc
  , getDocs
  , getDoc
  , updateDoc
  , deleteDoc
}

module.exports = crudFunctions
