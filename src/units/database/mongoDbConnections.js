const DotEnv = require('dotenv')

const connections = {
    'development': process.env.DB_HOST_DEVELOPMENT
  , 'production': process.env.DB_HOST_PRODUCTION
}

module.exports = connections
