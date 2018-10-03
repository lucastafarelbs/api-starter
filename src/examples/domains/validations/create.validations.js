const Joi = require('joi')

const body = Joi.object().keys({
    exampleFieldString: Joi.string().required()
  , exampleFieldDate: Joi.date().required()
})

module.exports = { body }
