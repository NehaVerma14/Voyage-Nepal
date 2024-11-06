const express = require('express')
const router = express.Router()

const {
	updatePhoto,
	getUserById,
	removeUserById,
	updateUserRole,
	getUserDetails,
	getNextUserPage,
	getPreviousUserPage,
	uploadOrChangePhoto,
} = require('../controllers/userController')
const { isSignedIn, getUserProfile, isAdmin } = require('../middleware/authMiddleware')
const { upload } = require('../utils/uploadHelper')

router.param('userId', getUserById)

router.post(
	'/user/upload/avatar-img',
	isSignedIn,
	getUserProfile,
	upload.single('photo'),
	uploadOrChangePhoto
)

//get user details and profile details
router.get('/user/user-details', isSignedIn, getUserProfile, getUserDetails)

//to make the parameter option we use ? sign after the parameter
//here lastObjectId is the optional parameter
router.get(
	'/users/next-page/:userId/:lastObjectId?',
	isSignedIn,
	getUserProfile,
	isAdmin,
	getNextUserPage
)

router.get(
	'/users/previous-page/:userId/:firstObjectId',
	isSignedIn,
	getUserProfile,
	isAdmin,
	getPreviousUserPage
)

router.put(
	'/user/avatar-img/change',
	isSignedIn,
	getUserProfile,
	upload.single('photo'),
	uploadOrChangePhoto
)

router.delete('/user/:userId/:userDeleteId', isSignedIn, getUserProfile, isAdmin, removeUserById)

router.put(
	'/user/update-role/:userId/:userRoleUpdateId',
	isSignedIn,
	getUserProfile,
	isAdmin,
	updateUserRole
)

module.exports = router
