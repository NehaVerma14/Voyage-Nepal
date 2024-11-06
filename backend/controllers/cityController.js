const { default: axios } = require('axios')
const npmlog = require('npmlog')
const City = require('../models/cityModel')
const Place = require('../models/placeModel')

exports.createNewCity = async (req, res) => {
	const { name, cityType } = req.body
	const key = process.env.GOOGLE_MAP_KEY
	const URL = 'https://maps.googleapis.com/maps/api/geocode/json'
	try {
		const city = new City({
			name,
			cityType,
		})
		const { data } = await axios.get(`${URL}?address=${name}&components=country:NP&key=${key}`)
		if (data.status !== 'OK') {
			throw new Error('Unable to set latitutde and longitude of the place')
		}

		const { results } = data
		const {
			geometry: { location },
		} = results[0]
		city.lat = location.lat
		city.long = location.lng
		await city.save()
		res.status(200).json({ newCity: city })
	} catch (err) {
		errMsg = err.code === 11000 ? 'City already exist in a DB' : 'Oops! Unable to create a city'
		res.status(403).json({ error: errMsg })
	}
}

exports.getAllCities = async (req, res) => {
	try {
		const cities = await City.find({})
		return res.status(200).json(cities)
	} catch (error) {
		console.log(error)
		return res.status(404).json({ error: 'No Cities found!' })
	}
}

exports.getPlaceByCity = async (req, res) => {
	try {
		const { cityId } = req.params
		const places = await Place.find({ nearestCity: cityId })
		return res.status(200).json(places)
	} catch (error) {
		console.log(error)
		return res.status(404).json({ error: 'No Cities found!' })
	}
}
