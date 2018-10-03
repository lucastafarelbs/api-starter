const Path = require('path')
const thisUnit = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisHandler = Path.basename( __filename.split('.')[0] )
const BusinessRules = require(`../../domains/business-rules/${thisHandler}.js`)
const GetModel = require('../../../get-model.js')

const login = async (req, res, next) => {
  try {
    const token = await BusinessRules.login( req)
    res.send( 201, { token } )
  } catch (e) {
    console.log( 'error:\n', e );
    res.send( 500, e.message )
  }
}

module.exports = { login }
