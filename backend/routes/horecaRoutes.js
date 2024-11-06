const express = require('express')
const router = express.Router()

const {
	getHotelById,
	createHotelForPlace,
	deleteHotel,
	updateHotel,
	getAllStayPlaces,
	getNextHotelPage,
	getPreviousHotelPage,
} = require('../controllers/horecaController')
const { getUserById } = require('../controllers/userController')
const { isSignedIn, getUserProfile, isAdmin } = require('../middleware/authMiddleware')
const { uploadHotelPhoto } = require('../middleware/hotelMiddleware')
const { upload } = require('../utils/uploadHelper')

router.param('hotelId', getHotelById)
router.param('userId', getUserById)

router.get('/hotels/:userId', isSignedIn, getUserProfile, isAdmin, getAllStayPlaces)

router.get(
	'/hotels/next-page/:userId/:lastObjectId?',
	isSignedIn,
	getUserProfile,
	isAdmin,
	getNextHotelPage
)

router.get(
	'/hotels/previous-page/:userId/:firstObjectId',
	isSignedIn,
	getUserProfile,
	isAdmin,
	getPreviousHotelPage
)

//create hotel
router.post(
	'/hotel/create',
	isSignedIn,
	getUserProfile,
	isAdmin,
	upload.single('photo'),
	uploadHotelPhoto,
	createHotelForPlace
)

//update the hotel
router.put('/hotel/update/:hotelId/:userId', isSignedIn, getUserProfile, isAdmin, updateHotel)

//delete the hotel
router.delete('/hotel/delete/:hotelId/:userId', isSignedIn, getUserProfile, isAdmin, deleteHotel)

module.exports = router
