const Path = require('path')
const thisModel = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const thisHandler = Path.basename( __filename ).split( '.' )[ 0 ]
const GetModel = require('../../../get-model.js')

const deleteById = async (req, res, next) => {
  const BusinessRules = require(`../../../domains/${thisModel}/business-rules/${thisHandler}.js`)
  req.$model = thisModel
  const query = { _id: req.params.id }
  try {
    await BusinessRules.deleteById( req, query  )
    return res.send( 200 , 'removeu')
  } catch (e) {
    console.log(e);
    return res.send( 404 , 'Document Not Found' )
  }
  next()
}

module.exports = { deleteById }
