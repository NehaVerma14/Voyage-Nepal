const express = require('express')
const router = express.Router()

//controllers
const { createNewCity, getAllCities, getPlaceByCity } = require('../controllers/cityController')
const { isSignedIn, getUserProfile, isAdmin } = require('../middleware/authMiddleware')

//create a New City
router.post('/city/create', isSignedIn, getUserProfile, isAdmin, createNewCity)

//Get all cities
router.get('/city', isSignedIn, getAllCities)

//Get places by city
router.get('/city/:cityId', isSignedIn, getPlaceByCity)

module.exports = router
