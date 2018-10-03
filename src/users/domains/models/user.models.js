const model = ( Schema ) => ({
		fullname: { type: String, uppercase: true, required: true }
	, email: { type: String, unique: true }
	, username: { type: String, unique: true }
	,	password: { type: String, required: true }
	,	role: { type: String, required: true }
	, profilePicture: { type: String }
	, status: { type: Boolean, required: true, default: true }
})

module.exports = model
