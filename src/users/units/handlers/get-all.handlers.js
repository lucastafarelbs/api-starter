const Path = require('path')
const thisModel = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisHandler = Path.basename( __filename ).split( '.' )[ 0 ]
const GetModel = require('../../../get-model.js')

const getAll = async (req, res, next) => {
  const BusinessRules = require(`../../../domains/${thisModel}/business-rules/${thisHandler}.js`)
  const options = {
      limit:  parseInt(req.query.limit, 10) || 10
    , skip:  parseInt(req.query.skip, 10) || 0
  }
  delete req.query.skip
  delete req.query.limit
  const query = { ...req.query }
  req.$model = thisModel

  try {
    const docs = await BusinessRules.getAll( req, query, options )
    res.send( 200, docs || [] )
  } catch (e) {
    console.log('error: \n', e);
    res.send( 500, e.message )
  }

  next()
}

module.exports = { getAll }
