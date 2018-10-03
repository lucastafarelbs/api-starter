const Joi = require('joi')

const body = Joi.object().keys({
    token: Joi.string().required()
})

module.exports = { body }
