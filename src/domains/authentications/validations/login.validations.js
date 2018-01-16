const Joi = require('joi')

const validRoles = ['administrator', 'user']

const body = Joi.object().keys({
    usernameOrEmail: Joi.string().required()
  , password: Joi.string().required()
  , deviceName: Joi.string().required()
  , networkIp: Joi.string().required()
  , platformOS: Joi.string().required()
})

module.exports = { body }
