const GenerateJwt = require('../../../../support/in-house-functions/jwt/generate-jwt.js')
const CompareEncryptedText = require('../../../../support/in-house-functions/cryptography/compare-encrypted-text.js')
const GetModel = require('../../../get-model.js')
const CurrentDatetimeUtc= require('../../../../support/in-house-functions/date-time/current-datetime-utc')

const validatePassword = ( passwordRaw, passwordEncrypted) =>
  CompareEncryptedText( passwordRaw, passwordEncrypted )
const login = async ( req ) => {
  const UserModel = GetModel( req.$connection, 'users' )
  const queryByEmail = { email: req.body.usernameOrEmail }
  const queryByUsername = { username: req.body.usernameOrEmail }
  const queryUser = (req.body.usernameOrEmail.includes('@')) ? queryByEmail :  queryByUsername
  const foundUser = await UserModel.findOne( queryUser )
  if ( !foundUser )
    throw new Error('loginError: User doesn\'t exists')

  if ( !validatePassword( req.body.password, foundUser.password ) )
    throw new Error('loginError: Invalid password')

  const AuthModel = GetModel( req.$connection, 'authentications')
  const queryAuthLogged = {
      userId : foundUser._id
    , deviceName:  req.body.deviceName
    , networkIp: req.body.networkIp
    , platformOS:  req.body.platformOS
  }

  const payloadToken = {
      userId: foundUser._id
    , userRole: foundUser.role
  }

  const foundAuth = await AuthModel.findOne( queryAuthLogged )
  const tokenObject = {
      secret: req.$client.apiSecret
    , payload: payloadToken
  }
  req.$token =  GenerateJwt( tokenObject )
  const authData = {
      token: req.$token
    , userId: payloadToken.userId
    , deviceName: req.body.deviceName
    , networkIp: req.body.networkIp
    , platformOS: req.body.platformOS
  }

  if (!foundAuth) {
    const createData = { ...authData, createdAt: CurrentDatetimeUtc() }
    await AuthModel.create( createData )
    return req.$token
  }

  const updateData = { ...authData, updatedAt: CurrentDatetimeUtc() }
  await AuthModel.findOneAndUpdate( { _id: foundAuth._id }, updateData, { multi : false } )
  return req.$token
}


module.exports = { login }
