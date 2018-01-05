const validateConfigs = ( configs ) => {
  return (
       configs.method
    && configs.path
    && configs.handler
  )
}

const routeModel = {
    method: 'http-method'
  , path: '/your-route'
  , name: 'name-of-you-route( optional, but not repeat it! )'
  , version: 'X.X.X'
  , handler: '{ your-handler } or [ your-handlers ]'
}

const routeFactory =  ( method, path, name = '', version = '', handler ) => {
  method = (method) ? method.toLowerCase() : ''
  const configurations = { method, path, name, version, handler }
  if ( !validateConfigs( configurations ) ) {
    console.log(`\n An error has ocurred when trying to create route ${configurations.name} ->  ${ configurations.path }
                \n Be right that your route is like it: \n %o \n\n`, routeModel );
    return null
  }
  return Object.assign({}, configurations )
}

module.exports = routeFactory
