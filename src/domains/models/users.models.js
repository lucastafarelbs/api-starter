const model = ( Schema ) => ({
		email: { type: String, unique: true }
	, username: { type: String, unique: true }
	, fullname: { type: String }
	,	password: { type: String }
	,	role: { type: String }
	, status: { type: Boolean, default: true }
	, createdAt: { type: Date }
	, updatedAt: { type: Date }
})

module.exports = model
