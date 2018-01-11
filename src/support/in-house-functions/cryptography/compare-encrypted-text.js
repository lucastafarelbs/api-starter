const BcryptNodejs = require('bcrypt-nodejs')

const compareText = ( textToCompare, encryptedText ) =>
  BcryptNodejs.compareSync( textToCompare, encryptedText )

module.exports = compareText
