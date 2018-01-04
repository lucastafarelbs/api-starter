const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const _schema = {
		name: {type: String}
	,	task: {type: String}
	,	status: {type: String}
  , createdAt: {type: Date}
  , updatedAt: {type: Date}
}

const InterruptionSchema = new Schema( _schema )

module.exports = Mongoose.model('Todo', InterruptionSchema)
