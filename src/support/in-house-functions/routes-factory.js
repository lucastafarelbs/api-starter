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
  , validate: '{ params: {validations to req.params }, body: { validations to req.body } }( optional )'
  , needAuth: 'Boolean (Default:true)'
}

const routeFactory =  ( method, path, name = '', version = '', handler, validateParamsBody = {}, needAuth = true ) => {
  method = (method) ? method.toLowerCase() : ''
  const validate = { }
  if ( validateParamsBody['params'] )
    validate['params'] = validateParamsBody['params']
  if ( validateParamsBody['body'] )
    validate['body'] = validateParamsBody['body']

  const configurations = { method, path, needAuth, validate, name, version, handler  }
  if ( !validateConfigs( configurations ) ) {
    console.log(`\n An error has ocurred when trying to create route ${configurations.name} ->  ${ configurations.path }
                \n Be right that your route is like it: \n %o \n\n`, routeModel );
    return null
  }
  return { ...configurations }
}

module.exports = routeFactory
