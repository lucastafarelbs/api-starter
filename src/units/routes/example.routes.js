module.exports = [
  {
      method: 'GET',
      path:'/hello',
      handler: function (request, h) {

          return 'hello world';
      }
  }
  , {
      method: 'GET',
      path:'/hello2',
      handler: function (request, h) {
          return 'hello world2';
      }
  }
]
