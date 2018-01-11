const Joi = require('joi')

const body = Joi.object().keys({
    fullname: Joi.string().required()
  , email: Joi.string().required()
  ,	password: Joi.string().required()
  ,	role: Joi.string().valid('administrator', 'ADMINISTRATOR').required()
})

module.exports = { body }
