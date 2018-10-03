const EncryptText = require('../../../../support/in-house-functions/cryptography/encrypt-text.js')
const CurrentDatetimeUtc = require('../../../../support/in-house-functions/date-time/current-datetime-utc.js')
const GetModel = require('../../../models/get-model.js')

const create = async ( req, data ) => {
  const model = GetModel( req.$connection, req.$model )

  const docCreated = await model.create( {...data } )
  return docCreated
}

module.exports = { create }
