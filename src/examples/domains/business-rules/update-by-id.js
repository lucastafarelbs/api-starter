const EncryptText = require('../../../../support/in-house-functions/cryptography/encrypt-text.js')
const CurrentDatetimeUtc = require('../../../support/in-house-functions/date-time/current-datetime-utc.js')
const GetModel = require('../get-model.js')
const Path = require('path')
const thisDomain = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()

const update = async (model, query, data ) => {

  const newValues  = { $set: { ...data } }

  const found = await model.findOne(query)
  if ( !found )
    throw new Error(`${thisDomain}Error: Document not found.`)

  const options = {
      multi: false
    , returnOriginal: true
    , new: true
    , upsert: false
  }

  return model.update( query, newValues, options)
}

module.exports = { update }
