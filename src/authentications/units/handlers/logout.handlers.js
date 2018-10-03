const Path = require('path')
const thisUnit = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisHandler = Path.basename( __filename ).split( '.' )[ 0 ]
const BusinessRules = require(`../../domains/business-rules/${thisHandler}.js`)

const logout = async (req, res, next) => {
  req.$model = thisUnit
  try {
    const query = { token: req.body.token}
    await BusinessRules.logout( req, query )
    res.send( 201, 'Succeful' )
  } catch (e) {
    console.log( 'error:\n', e );
    res.send( 500, e.message )

  }

  next()
}

module.exports = { logout }
