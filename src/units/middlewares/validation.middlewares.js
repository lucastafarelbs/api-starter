const Joi = require('joi')
const { BadRequestError } = require('restify-errors')

const makeError = err => {
  if (err) {
    console.log('err ',err);
    const errors = err.details.map((e) => {
      return {
        code: e.type,
        detail: e.message,
        paths: e.path
      };
    });

    let error = new BadRequestError();
    error.body = errors;
    console.log(error);
    return error
  }
}

const hasValidate = ( req ) => ( req && req.route && req.route.validate && Object.keys( req.route.validate ).length )

const validate = ( objectToValidate, req ) => {
  const validationOptions = {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: true
  }

  return Joi.validate( req[ objectToValidate ], req.route.validate[ objectToValidate ], validationOptions )
}

const getValidations = ( req ) =>
  Object.keys( req.route.validate ).map( validationObject => validate( validationObject, req ))

const ensureJoiSchema = (req, res, next) => {
  if ( !hasValidate( req ) )
    return next( )

  Promise.all( getValidations( req ) || [])
  .then(value => {
    next()
  })
  .catch(err => {
    if (err) {
     res.send( makeError(err).body )
     return next(false)
    }
    next()
  })
}

module.exports = ensureJoiSchema
