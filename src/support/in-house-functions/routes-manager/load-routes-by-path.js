const Path = require('path')
const FilterFiles = require('filter-files')
const IsDirectory = require('is-directory')
const isRouteFileRegex = /((routes)|(route))\.js$/
const isRouteFile = fileName => isRouteFileRegex.test( fileName )
const { flatten } = require('lodash')

const getRoutesFilesFromDirname = dirname => {
  return FilterFiles.sync( dirname, ( fp, dir, files, recurse ) => {
    if ( isRouteFile( fp ) ) {
      return true
    }

    return IsDirectory.sync( Path.join( dir, fp ) )
  }, true)
}

const loadRoutesByPath = dirName => {
  const routes = getRoutesFilesFromDirname( dirName )
    .map( require )
  return flatten( routes )
}

module.exports = loadRoutesByPath
