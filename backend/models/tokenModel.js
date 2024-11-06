const mongoose = require('mongoose')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const tokenSchema = new Schema(
	{
		refreshToken: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		userId: {
			type: ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
)

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
