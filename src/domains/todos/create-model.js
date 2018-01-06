const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const schema = new Schema({
		name: {type: String}
	,	task: {type: String}
	,	status: {type: String}
  , createdAt: {type: Date}
  , updatedAt: {type: Date}
})

const createModel = ( connection ) => connection.model( 'Todo',  schema )
module.exports = createModel
