const Path = require('path')
const thisModel = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()
const GetModel = require('../../../get-model.js')
const thisHandler = Path.basename( __filename ).split( '.' )[ 0 ]

const updateById = async (req, res, next) => {
  const BusinessRules = require(`../../../domains/${ thisModel }/business-rules/${ thisHandler}.js`)
  const query = {
    _id: req.params.id
  }
  try {
    await BusinessRules.update( GetModel( req.$connection, thisModel ), query, req.body )
    return res.send( 200 ,'Alterado com Sucesso')
  } catch (e) {
    console.log('error: \n', e);
    return res.send( 404 , 'User Not Found' )
  }
  next()
}

module.exports = { updateById }
