const express = require('express')
const router = express.Router()

const {
	getPlaceById,
	getRandomPlaces,
	getAllPlace,
	deletePlace,
	createPlace,
	updatePlace,
	recommendsPlace,
	getNextPlacePage,
	getPreviousPlacePage,
	getPlaceByCategory,
	uploadPlaceFeaturedImg,
	getMostVisitedPlaces,
	getTopRatedPlaces,
	getNearbyPlaces,
} = require('../controllers/placeController')
const { isSignedIn, getUserProfile, isAdmin } = require('../middleware/authMiddleware')
const { getUserById } = require('../controllers/userController')
const { upload } = require('../utils/uploadHelper')
const { uploadPlacePhoto } = require('../middleware/placeMiddleware')

router.param('placeId', getPlaceById)
router.param('userId', getUserById)

//get place by Id
router.get('/place/:placeId', isSignedIn, getUserProfile, (req, res) => {
	return res.status(200).json(req.place)
})

//get All the places
router.get('/places', isSignedIn, getAllPlace)

//get most visited places
router.get('/places/most-visited', isSignedIn, getMostVisitedPlaces)

//get top rated places
router.get('/places/top-rated', isSignedIn, getTopRatedPlaces)

//get nearest places
//nearby?origin=origin_coordinates
router.get('/places/nearby', isSignedIn, getNearbyPlaces)

//get 10 random places
router.get('/places/random', isSignedIn, getRandomPlaces)

router.get(
	'/places/next-page/:userId/:lastObjectId?',
	isSignedIn,
	getUserProfile,
	isAdmin,
	getNextPlacePage
)

router.get(
	'/places/previous-page/:userId/:firstObjectId',
	isSignedIn,
	getUserProfile,
	isAdmin,
	getPreviousPlacePage
)

//get places by gategory
router.get('/places/:categoryId/category', isSignedIn, getPlaceByCategory)

router.post('/place/create', isSignedIn, getUserProfile, isAdmin, createPlace)

//upload place featured image
router.post(
	'/place/upload/featured-image',
	isSignedIn,
	getUserProfile,
	isAdmin,
	upload.single('photo'),
	uploadPlacePhoto,
	uploadPlaceFeaturedImg
)

//recommendation routes
router.post('/place/recommends/:userId', isSignedIn, getUserProfile, recommendsPlace)

//update place
router.put('/place/update/:placeId/:userId', isSignedIn, getUserProfile, isAdmin, updatePlace)
//deleteplace
router.delete('/place/delete/:placeId/:userId/', isSignedIn, getUserProfile, isAdmin, deletePlace)

module.exports = router
