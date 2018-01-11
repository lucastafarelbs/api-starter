const MongodbCrudFunctions = require('../../support/database/mongodb-crud-functions.js')
const GenerateJwt = require('../../support/in-house-functions/jwt/generate-jwt.js')
const CompareEncryptedText = require('../../support/in-house-functions/cryptography/compare-encrypted-text.js')
const GetModel = require('../models/get-model.js')
const CurrentDatetimeUtc= require('../../support/in-house-functions/date-time/current-datetime-utc')

const validatePassword = ( passwordRaw, passwordEncrypted) =>
  CompareEncryptedText( passwordRaw, passwordEncrypted)

const login = async ( req, res ) => {
  const UserModel = GetModel( req.$connection, 'users' )
  const queryByEmail = { email: req.body.usernameOrEmail }
  const queryByUsername = { username: req.body.usernameOrEmail }
  const queryUser = (req.body.usernameOrEmail.includes('@')) ? queryByEmail :  queryByUsername
  await UserModel.findOne( queryUser, ( errUser, user ) => {
    if ( errUser ) {
      const errorMessage = 'loginError: ' + errUser.message|| ' User error '
      res.send( 500, errorMessage )
      return next( false )
    }
    if ( !user ) {
      const errorMessage = 'loginError: User doesn\'t exists'
      res.send( 500, errorMessage )
      return next( false )
    }
    if ( !validatePassword( req.body.password, user.password ) ) {
      const errorMessage = 'loginError: Invalid password'
      res.send( 500, errorMessage )
      return next( false )
    }

    const AuthModel = GetModel( req.$connection, 'authentications')
    const queryAuthLogged = {
        userId : user._id
      , deviceName:  req.body.deviceName
      , networkIp: req.body.networkIp
      , platformOS:  req.body.platformOS
    }

    req.$user = {
      userId: user._id,
      userRole: user.role
    }

    AuthModel.findOne( queryAuthLogged, ( errAuth, auth ) => {
      if ( errAuth ){
        const errorMessage = 'loginError: ' + errAuth.message|| ' Authenticaion error '
        res.send( 500, errorMessage )
        return next( false )
      }

      const tokenObject = {
        secret: req.$client.apiSecret,
        payload: req.$user
      }
      req.$token =  GenerateJwt( tokenObject )
      const authData = {
          token: req.$token
        , userId: req.$user.userId
        , deviceName: req.body.deviceName
        , networkIp: req.body.networkIp
        , platformOS: req.body.platformOS
      }

      if (!auth) {
        const createData = { ...authData, createdAt: CurrentDatetimeUtc() }
        AuthModel.create( createData, ( errCreateAuth, createdAuth) => {
          if ( errCreateAuth ){
            const errorMessage = 'loginError: ' + errAuth.message|| ' Authenticaion error '
            res.send( 500, errorMessage )
            return next( false )
          }
          res.send(200, { token: req.$token })
        })
      }
      else {
        const updateData = { ...authData, updatedAt: CurrentDatetimeUtc() }
        AuthModel.findOneAndUpdate( { _id: auth._id }, updateData, { multi : false}, ( errUpdateAuth, updatedAuth) => {
          if ( errUpdateAuth ){
            const errorMessage = 'loginError: ' + errAuth.message|| ' Authenticaion error '
            res.send( 500, errorMessage )
            return next( false )
          }
          res.send(200, { token: req.$token })

        })
      }
    })
  })
}

const logout = ( model, query ) => MongodbCrudFunctions.deleteDoc( model, query )

module.exports = { login, logout }
