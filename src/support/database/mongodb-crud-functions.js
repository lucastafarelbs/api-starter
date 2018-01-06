const create = ( model, data ) => {
  return model.create( data )
}

const getAll = ( model, query, options ) => {
  return model.find( query ).limit( options.limit ).skip( options.skip )
}

const getById = ( model, query ) => model.findOne( query )

const updateById = ( model, query, newValues) => {
  const options = {
    multi: false,
    returnOriginal: true,
    new: true,
    upsert: true
  }
  return model.findOneAndUpdate( query, newValues, options )
}

const deleteById = ( model, query ) => model.remove(query)

module.exports = { create, getAll, getById, updateById, deleteById }
