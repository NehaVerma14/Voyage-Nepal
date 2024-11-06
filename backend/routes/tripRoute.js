const express = require('express')
const router = express.Router()

//controllers
const {
	createNewTrip,
	deleteTrip,
	getDistinctTripCity,
	getUserPlanByCity,
} = require('../controllers/tripController')
const { isSignedIn } = require('../middleware/authMiddleware')

//create a Trip
router.post('/trip/create', isSignedIn, createNewTrip)

//get distinct trip city
router.get('/trip/distinct/city', isSignedIn, getDistinctTripCity)

//delete a trip
router.delete('/trip/:tripId/delete', isSignedIn, deleteTrip)

//Get user trip plan
router.get('/trip/:cityId', isSignedIn, getUserPlanByCity)

// //Get places by city
// router.get('/city/:cityId', isSignedIn, getPlaceByCity)

module.exports = router
