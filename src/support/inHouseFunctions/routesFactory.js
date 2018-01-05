const validateConfigs = ( configs ) => {
  return (
       configs.method
    && configs.path
    && configs.handler
  )
}

const routeFactory =  ( method, path, name = '', version = '', handler ) => {
  const configurations = { method, path, name, version, handler }
  if ( !validateConfigs( configurations ) ){
    return null
  }
  return Object.assign({}, configurations )
}

module.exports = routeFactory
