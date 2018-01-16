const Joi = require('joi')

const validRoles = ['administrator', 'user']

const body = Joi.object().keys({
    fullname: Joi.string().required()
  , email: Joi.string().required()
  ,	password: Joi.string().required()
  ,	role: Joi.string().valid( validRoles ).required()
})

module.exports = { body }
