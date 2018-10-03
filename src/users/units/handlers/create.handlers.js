const Path = require('path')
const thisModel = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisHandler = Path.basename( __filename ).split( '.' )[ 0 ]

const create = async (req, res, next) => {
  const BusinessRules = require(`../../../domains/${thisModel}/business-rules/${thisHandler}.js`)
  req.$model = thisModel

  try {
    userCreated = await BusinessRules.create( req, req.body )
    res.send(201, userCreated)
  } catch (e) {
    console.log( 'erro:::', e );
    res.send(500, e.message)
  }
}

module.exports = { create }
