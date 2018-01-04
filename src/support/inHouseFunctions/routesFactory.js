const route = {
  create  ( method, path, name, version, handler ) {
    const configurations = { method, path, name, version, handler }
    if ( this.validateConfigs( configurations ) ){
      return Object.assign({}, this.route( configurations ) )
    }
  },

  validateConfigs ( configs ) {
    return (
         configs.method
      && configs.path
      && configs.handler
    )
  },
  route: ( configs ) => ({
      method: configs.method
    , path: configs.path
    , name: configs.name || ''
    , version: configs.version || ''
    , handler: configs.handler
  })
}

module.exports = route
