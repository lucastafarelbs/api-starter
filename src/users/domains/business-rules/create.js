const EncryptText = require('../../../../../support/in-house-functions/cryptography/encrypt-text.js')
const CurrentDatetimeUtc = require('../../../../../support/in-house-functions/date-time/current-datetime-utc.js')
const GetModel = require('../../../get-model.js')

const omitFields = { password: 0 }

const thisEmailsIsAlreadyInUse = async ( model, email ) => {
  const query = {
		email: new RegExp('^' + email + '$', "i")
	}
  const foundUserUsingEmail = await model.findOne( query, omitFields )
  return ( foundUserUsingEmail ) ? foundUserUsingEmail : false
}

const validateBody = ( body, schema ) => {
  const validationOptions = {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: true
  }

  return Joi.validate( body, schema, validationOptions )
}

const create = async ( req, data ) => {
  const model = GetModel( req.$connection, req.$model )
  const userUsingThisEmail = await thisEmailsIsAlreadyInUse(model, data.email )

  if ( userUsingThisEmail )
    throw new Error(`userError: This email already in use by user: ${ userUsingThisEmail._id }`)

  const toInsert = {
      ...data,
      createdAt: CurrentDatetimeUtc(),
      password: EncryptText( data.password ),
      username: data.email.split('@')[0]
  }
  const userCreated = await model.create( toInsert )
  return userCreated
}

module.exports = { create }
