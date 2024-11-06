const mongoose = require('mongoose')

const Schema = mongoose.Schema

const { ObjectId } = Schema.Types

const profileSchema = new Schema(
	{
		userId: {
			type: ObjectId,
			trim: true,
			ref: 'User',
		},
		DOB: {
			type: Date,
		},
		city: {
			type: ObjectId,
			trim: true,
			ref: 'City',
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other'],
			default: 'male',
			required: true,
		},
		otpExpiresIn: {
			type: Date,
			unique: true,
		},
		encryptedOtp: {
			type: String,
			unique: true,
		},
	},
	{ timestamps: true }
)

//Profile Model
const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
