const MongodbCrudFunctions = require('../../support/database/mongodb-crud-functions.js')
const EncryptText = require('../../support/in-house-functions/cryptography/encrypt-text.js')
const CurrentDatetimeWithoutTimezone = require('../../support/in-house-functions/date-time/current-datetime-utc.js')

const omitFields = { password: 0 }

const thisEmailsIsAlreadyInUse = async ( model, email ) => {
  const query = {
		email: new RegExp('^' + email + '$', "i")
	}
  const foundUserUsingEmail = await MongodbCrudFunctions.getDocs( model, [ query, omitFields ] )
  return ( foundUserUsingEmail ) ? foundUserUsingEmail[ 0 ] : false
}

const create = async ( model, data ) => {
  const userUsingThisEmail = await thisEmailsIsAlreadyInUse(model, data.email )
  if ( userUsingThisEmail )
    throw new Error(`userError: This email already in use by user:${ userUsingThisEmail._id }`)

  const toInsert = { ...data, createdAt: CurrentDatetimeWithoutTimezone(), password: EncryptText( data.password ), username: data.email.split('@')[0] }
  return MongodbCrudFunctions.createDoc( model, toInsert )
}

const get = (model, query, options ) =>
  MongodbCrudFunctions.getDocs( model, [ query, omitFields ] , options )

const getById = (model, query ) =>
  MongodbCrudFunctions.getDoc( model, [ query, omitFields ] )

const updateById = async (model, query, data ) => {
  if ( data && data.password )
    data.password = EncryptText( data.password )
  const toUpdate = { ...data, updatedAt: CurrentDatetimeWithoutTimezone() }
  const newValues  = { $set: toUpdate }
  return MongodbCrudFunctions.updateDoc( model, [ query, omitFields ], newValues)
}

const deleteById = (model, query ) => MongodbCrudFunctions.deleteDoc( model, query )

module.exports = { create, get, getById, updateById, deleteById }
