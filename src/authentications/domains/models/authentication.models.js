const model = ( Schema ) => ({
		token: { type: String, required: true }
	, userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
	, deviceName: { type: String, required: true }
	, networkIp: { type: String, required: true }
	, platformOS: { type: String, required: true }
	, createdAt: { type: Date }
	, updatedAt: { type: Date }
})
module.exports = model
