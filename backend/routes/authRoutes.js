const express = require('express')
const router = express.Router()
const { getUserById } = require('../controllers/userController')
const {
	userSignup,
	userEmailVerification,
	userSingin,
	forgetPassword,
	resetPassword,
	changeCurrentPassword,
	handleSignout,
	tokenGenerator,
	signWithGoogle,
	signWithFacebook,
} = require('../controllers/authController')
const {
	isSignedIn,
	getUserProfile,
	isGoogleTokenVerified,
	isAuthenticatedByFacebook,
	verifyOtpAndGetProfileId,
} = require('../middleware/authMiddleware')

router.param('userId', getUserById)

//Activate User
router.get('/user/verify-email', userEmailVerification)

//Create New User
router.post('/user/signup', userSignup)

//user sign in
router.post('/user/signin', userSingin)

//user google login
router.post('/user/google/signin', isGoogleTokenVerified, signWithGoogle)

//user facebook login
router.post('/user/facebook/signin', isAuthenticatedByFacebook, signWithFacebook)

router.get('/user/protected', isSignedIn, getUserProfile, (req, res) => {
	res.send('You are accessing the protected routes')
})

//forget Password
router.post('/user/forget-password', forgetPassword)

//verify user otp
router.post('/user/verify-otp', verifyOtpAndGetProfileId)

//reset user otp
router.post('/user/reset-password', resetPassword)

router.put('/user/change-password', isSignedIn, getUserProfile, changeCurrentPassword)

router.post('/auth/:userId/token', tokenGenerator)

router.get('/auth/:userId/signout', isSignedIn, getUserProfile, handleSignout)

module.exports = router
