const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { rolePowerEnum } = require('../controllers/enum')
const npmlog = require('npmlog')
const client = new OAuth2Client(process.env.CLIENT_ID)
const axios = require('axios')

//Check if user is Signed in
exports.isSignedIn = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const authToken = authHeader && authHeader.split(' ')[1]

	if (!authToken) return res.status(401).json({ error: 'User is not logged in...' })

	jwt.verify(authToken, process.env.JWT_SECRETS, (err, decodedValue) => {
		if (err) {
			return res.status(401).json({ error: 'Invalid Access Token found!' })
		}

		req.auth = decodedValue
		next()
	})
}

exports.isGoogleTokenVerified = async (req, res, next) => {
	const { idToken } = req.body
	try {
		const ticket = await client.verifyIdToken({
			idToken,
			audience: process.env.CLIENT_ID,
		})
		const payload = ticket.getPayload()
		// const userid = payload['sub']
		req.googlePayload = payload
		next()
	} catch (error) {
		npmlog.error(error.message)
		return res.status(401).json({ error: 'Unauthorized Access!' })
	}
}

exports.isAuthenticatedByFacebook = async (req, res, next) => {
	const { accessToken } = req.body.data
	const debugAccessTokenUrl = 'https://graph.facebook.com/debug_token'
	try {
		const { data: response } = await axios(
			`${debugAccessTokenUrl}?input_token=${accessToken}&access_token=${process.env.FB_APP_TOKEN}`
		)
		if (!response.data.is_valid) {
			throw new Error('Invalid access token!')
		}
		next()
	} catch (error) {
		errMsg = error.message ? error.message : 'Unauthorized Access!'
		npmlog.error(errMsg)
		return res.status(401).json({ error: errMsg })
	}
}

exports.getUserProfile = async (req, res, next) => {
	const { id } = req.auth
	try {
		const user = await User.findById(id)
		if (!user) {
			throw new Error('User not found!')
		}
		req.auth.user = user
		next()
	} catch (error) {
		npmlog.error(error.message)
		return res.status(404).json({ error: error.message ? error.message : error })
	}
}

//isAdmin check
exports.isAdmin = (req, res, next) => {
	const { role } = req.auth.user

	if (rolePowerEnum[role] > 10) {
		next()
	} else {
		return res.status(401).json({ error: 'Not Enough Permission!' })
	}
}

exports.isSubAdmin = (req, res, next) => {
	const { role } = req.auth.user

	if (rolePowerEnum[role] > 5) {
		next()
	} else {
		return res.status(401).json({ error: 'Not Enought Permission!' })
	}
}

exports.verifyOtpAndGetProfileId = async (req, res) => {
	const { otp } = req.body

	const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex')

	const profile = await Profile.findOne({
		encryptedOtp: hashedOtp.toString(),
		otpExpiresIn: { $gt: Date.now() },
	})

	if (!profile) {
		return res.status(408).json({ error: 'Invalid or Expired OTP' })
	}

	profile.encryptedOtp = null
	profile.otpExpiresIn = null

	await profile.save()
	return res.status(200).json({ resetUserId: profile.userId })
}
