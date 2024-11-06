const express = require('express')
const router = express.Router()

const {
	createPlaceReview,
	getReviewByUserId,
	deleteReviewById,
	getPendingReview,
	approvePendingReview,
} = require('../controllers/reviewController')
const { getUserById } = require('../controllers/userController')
const { getPlaceById } = require('../controllers/placeController')
const { isSignedIn, getUserProfile, isAdmin } = require('../middleware/authMiddleware')

router.param('placeId', getPlaceById)
router.param('userId', getUserById)

router.post('/review/:placeId/create', isSignedIn, getUserProfile, createPlaceReview)

//get an individual review
router.get('/review/:userId', isSignedIn, getUserProfile, getReviewByUserId)

//get all pending reviews
router.get('/review/pending/:userId', isSignedIn, getUserProfile, isAdmin, getPendingReview)

//approve pending review
router.put('/review/approve/:userId', isSignedIn, getUserProfile, isAdmin, approvePendingReview)

//delete review
router.delete(
	'/review/:reviewId/:userId/delete',
	isSignedIn,
	getUserProfile,
	isAdmin,
	deleteReviewById
)

module.exports = router
