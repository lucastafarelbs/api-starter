const Path = require('path')
const thisModel = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisHandler = Path.basename( __filename ).split( '.' )[ 0 ]

const create = async (req, res, next) => {
  const BusinessRules = require(`./${thisModel}/business-rules/${thisHandler}.js`)
  req.$model = thisModel

  try {
    created = await BusinessRules.create( req, req.body )
    res.send(201, created)
  } catch (e) {
    console.log( 'Error:\n', e );
    res.send(500, e.message)
  }
}

module.exports = { create }
