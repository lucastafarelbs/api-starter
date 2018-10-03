const EncryptText = require('../../../../../support/in-house-functions/cryptography/encrypt-text.js')
const CurrentDatetimeUtc = require('../../../../../support/in-house-functions/date-time/current-datetime-utc.js')
const GetModel = require('../../../get-model.js')

const update = async (model, query, data ) => {
  if ( data && data.password )
    data.password = EncryptText( data.password )

  data.username = ( data && data.email ) ? data.email.split('@')[0] : ''



  const newValues  = { $set: { ...data } }

  const foundUser = await model.findOne(query)
  if ( !foundUser )
    throw new Error('userError: User not find.')

  if ( !data.username )
    newValues.username = foundUser.email.split('@')[0]

  const options = {
      multi: false
    , returnOriginal: true
    , new: true
    , upsert: false
  }

  return model.update( query, newValues, options)
}

module.exports = { update }
