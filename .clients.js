const clients = {
  'development': {
      'apiSecret': 'developmentXYZ!@#$%&*987654123'
    , 'dbHost': 'mongodb://0.0.0.0:27017/api-starter-development'
    , 'status': true
  }
  , 'production': {
      'apiSecret': 'production*&&&*&*&@!@!!987654123'
    , 'dbHost': 'mongodb://0.0.0.0:27017/api-starter-production'
    , 'status': true
  }
}

module.exports = clients
