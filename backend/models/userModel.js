const mongoose = require('mongoose')
const crypto = require('crypto')
const { roleEnum } = require('../controllers/enum')
const bcrypt = require('bcrypt')
const Profile = require('./profileModel')

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minLength: 3,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			minLength: 1,
			unique: true,
		},
		avatarUrl: {
			type: String,
			trim: true,
		},
		role: {
			type: String,
			enum: [roleEnum.USER, roleEnum.SUBADMIN, roleEnum.ADMIN],
			default: roleEnum.USER,
		},
		password: {
			type: String,
			trim: true,
		},
		googleId: {
			type: String,
			trim: true,
		},
		facebookId: {
			type: String,
			trim: true,
		},
		profileId: {
			type: ObjectId,
			ref: 'Profile',
		},
	},
	{ timestamps: true }
)

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const saltRounds = 10
		this.password = await bcrypt.hash(this.password, saltRounds)
	}
	next()
})

userSchema.method({
	getHashPassword: async function (plainPassword) {
		if (plainPassword === '') return ''
		try {
			const saltRounds = 10
			const hash = await bcrypt.hash(plainPassword, saltRounds)
			return hash
		} catch (error) {
			return ''
		}
	},

	authenticate: async function (userPass) {
		// console.log(userPass)
		return await bcrypt.compare(userPass, this.password)
	},

	generateOtp: async function () {
		let otp = ''
		for (let i = 0; i < 6; i++) {
			otp += Math.floor(Math.random() * 10)
		}

		let doc = await Profile.findOne({ userId: this._id })

		if (!doc) {
			doc = new Profile({
				userId: this._id,
				otpExpiresIn: Date.now() + 5 * 60 * 1000,
				encryptedOtp: crypto.createHash('sha256').update(otp).digest('hex'),
			})
		} else {
			doc.otpExpiresIn = Date.now() + 5 * 60 * 1000
			doc.encryptedOtp = crypto.createHash('sha256').update(otp).digest('hex')
		}

		await doc.save()
		return otp
	},
})

//User Model
const User = mongoose.model('User', userSchema)

module.exports = User
