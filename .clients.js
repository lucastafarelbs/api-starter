const DotEnv = require('dotenv')

const clients = {
  'development': {
      'apiSecret': 'developmentXYZ!@#$%&*987654123'
    , 'dbHost': `mongodb://0.0.0.0:27017/${process.env.SERVER_NAME}-development`
    , 'status': true
  }
  , 'production': {
      'apiSecret': 'production*&&&*&*&@!@!!987654123'
    , 'dbHost': `mongodb://0.0.0.0:27017/${process.env.SERVER_NAME}-production`
    , 'status': true
  }
}

module.exports = clients
