const clients = {
  'development': {
      'apiSecret': 'developmentXYZ!@#$%&*987654123'
    , 'dbHost': 'mongodb://0.0.0.0:27017/api-starter-development'
    , 'status': true
  }
  , 'development2': {
      'apiSecret': 'development2XYZ!@#$%&*987654123'
    , 'dbHost': 'mongodb://0.0.0.0:27017/api-starter-development2'
    , 'status': false
  }
  , 'production': {
      'apiSecret': 'production*&&&*&*&@!@!!987654123'
    , 'dbHost': 'mongodb://0.0.0.0:27017/api-starter-production'
    , 'status': true
  }
}

module.exports = clients
