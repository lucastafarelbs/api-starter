const BcryptNodejs = require('bcrypt-nodejs')

const encryptText = ( textToEncrypt ) =>
  BcryptNodejs.hashSync( textToEncrypt, BcryptNodejs.genSaltSync( 10 ) )

module.exports = encryptText 
