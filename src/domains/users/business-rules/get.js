const GetModel = require('../../models/get-model.js')

const commonFields = {
    email: 1
  , username: 1
  ,	role: 1
  , fullname: 1
  , cpf: 1
  , birthday: 1
  , profilePicture: 1
  , biography: 1
  , address: 1
  , phones: 1
  , linkedMomCertificiation: 1
  , status: 1
  , createdAt: 1
  , updatedAt: 1
}

const queryAllRoles = ( model, query = {} ) => {
  const fields =  { ...commonFields }
  return model.find( query, fields )
}

const queryAdminsitrators = ( model, query = {} ) => {
  const fields =  { ...commonFields }
  return model.find( query, fields )
}

const querySupervisors = ( model, query = {} ) => {
  const fields =  { ...commonFields, immediateSupervisor: 1, coordinators: 1 }
  return model.find( query, fields )
  .populate( 'immediateSupervisor' )
  .populate( 'coordinators' )
}

const queryCoordinators = ( model, query = {} ) => {
  const fields =  { ...commonFields, immediateSupervisor: 1, professionalMoms: 1 }
  return model.find( query, fields )
  .populate( 'immediateSupervisor' )
  .populate( 'professionalMoms' )
}

const queryProfessionalMoms = ( model, query = {} ) => {
  console.log('get', query);
  const fields =  {
      ...commonFields
    , immediateSupervisor: 1
    , extraCertifications: 1
    , homeKindergarten: 1
    , driversLicense: 1
    , pets: 1
    , secondaryActivities: 1
    , smoke: 1
    , dailyMedication: 1
    , nationality: 1
    , firstLanguage: 1
    , otherLanguages: 1
    , attributes: 1
    , totalVacancies: 1
    , availableVacancies: 1
    , vacancieExpiration: 1
    , workingDayInitial: 1
    , workingDayFinish: 1
    , homeType: 1
    , homeTypeGattedCommunity: 1
    , homeAttributes: 1
    , homeRooms: 1
    , restrictions: 1
    , families: 1
  }

  return model.find( query, fields )
  .populate( 'immediateSupervisor' )
  .populate( 'families' )
}

const queryFamilies = ( model, query = {} ) => {
  const fields =  {
    ...commonFields
    , professionalMom: 1
    , children: 1
  }
  return model.find( query, fields )
  .populate( 'professionalMom' )
}

const queries = {
    all: queryAllRoles
  , administrator: queryAdminsitrators
  , supervisor: querySupervisors
  , coordinator: queryCoordinators
  , professionalmom: queryProfessionalMoms
  , family: queryFamilies

}

const getAll = async ( req, query, options ) => {
  const model = GetModel( req.$connection, req.$model )
  if ( query && query.role && queries[ query.role ] ) {
    return queries[ query.role ]( model, query )
  }
  return queries[ 'all' ]( model, query )
}


const getById = async ( req, query, options ) => {
  const model = GetModel( req.$connection, req.$model )
  const user = ( query._id ) ? await model.findOne( query ) : ''
  if ( !user )
    throw new Error('userError: User Not Found.')
  role = user.role || query.role
  if ( query && role && queries[ role ] ) {
    return queries[ role ]( model, query )
  }
  return queries[ 'all' ]( model, query )
}



module.exports = { getAll, getById }
