const Place = require('../models/placeModel')
const { default: axios } = require('axios')
const npmlog = require('npmlog')

const key = process.env.GOOGLE_MAP_KEY
exports.getPlaceById = async (req, res, next, id) => {
	try {
		const place = await Place.findById(id)
			.populate({
				path: 'reviews',
				match: { isApproved: true },
				select: 'user reviewText rating -_id isApproved',
				//nested population. It populate the user property
				populate: {
					path: 'user',
					select: 'name avatarUrl',
				},
			})
			.populate({
				path: 'stayPlace',
			})
			.populate({
				path: 'category',
				select: 'name',
			})
			.populate({
				path: 'nearestCity',
				select: 'name',
			})
			.exec()
		;(req.place = place), next()
	} catch (error) {
		return res.status(200).json({ error: 'Place not found' })
	}
}

exports.getMostVisitedPlaces = async (req, res) => {
	try {
		const places = await Place.find()
			.sort({ userRatingsTotal: 'desc' })
			.populate({
				path: 'nearestCity',
				select: 'name',
			})
			.limit(5)
		return res.status(200).json({ data: places })
	} catch (err) {
		console.log(err)
		return res.status(404).json({ error: 'Error! No places found.' })
	}
}

exports.getTopRatedPlaces = async (_req, res) => {
	try {
		const places = await Place.find({ rating: { $gt: 0 }, userRatingsTotal: { $gt: 0 } }).populate({
			path: 'nearestCity',
			select: 'name',
		})
		const result = places.map((place) => {
			const { rating, userRatingsTotal } = place
			const score = 0.5 * +rating + 10 * 0.5 * (1 - Math.exp(-Number(userRatingsTotal) / 10))
			return { score, place }
		})
		result.sort((a, b) => a.score - b.score).reverse()

		return res.status(200).json({ data: result.slice(0, 5) })
	} catch (err) {
		console.log(err)
		return res.status(404).json({ error: 'Error! No places found.' })
	}
}

exports.getNearbyPlaces = async (req, res) => {
	try {
		const origin = req.query.origin
		if (!origin) {
			return res.status(400).json({ error: 'Invalid Origin Address' })
		}

		const places = await Place.find().populate({
			path: 'nearestCity',
			select: 'name',
		})
		const baseUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}`
		const result = Promise.all(
			places.map(async (place) => {
				const { lat, lng } = place
				const { data } = await axios.get(`${baseUrl}&destinations=${lat}%2C${lng}&key=${key}`)
				const { rows } = data
				const { elements } = rows[0]
				const { distance, duration } = elements[0]
				const distanceScore = Number(distance.text.split(' ')[0])
				// console.log(distanceScore)
				return { distanceScore, distanceText: distance.text, durationText: duration.text, place }
			})
		)

		const data = await result
		data.sort((a, b) => a.distanceScore - b.distanceScore)

		return res.status(200).json({ data: data.slice(0, 5) })
	} catch (err) {
		console.log(err)
		return res.status(404).json({ error: 'Error! No places found.' })
	}
}

exports.getNextPlacePage = async (req, res) => {
	try {
		const { lastObjectId } = req.params
		let places
		if (!lastObjectId) {
			places = await Place.find({}).limit(5)
		} else {
			places = await Place.find({
				_id: { $gt: lastObjectId.toString() },
			}).limit(5)
		}
		return res.status(200).json({ data: places })
	} catch (err) {
		console.log(err)
		return res.status(400).json({ error: 'Cannot fetch the next place page' })
	}
}

exports.getPreviousPlacePage = async (req, res) => {
	try {
		const { firstObjectId } = req.params
		let places
		if (!firstObjectId) {
			places = await Place.find({})
				.sort({ _id: -1 })
				.select('name location ratings stayPlace')
				.limit(5)
		} else {
			places = await Place.find({ _id: { $lt: firstObjectId.toString() } })
				.sort({ _id: -1 })
				.select('name location ratings stayPlace')
				.limit(5)
		}
		return res.status(200).json({ data: places })
	} catch (err) {
		console.log(err)
		return res.json({ error: 'Cannot fetch Previous page' })
	}
}

exports.getPlaceByCategory = async (req, res) => {
	try {
		const { categoryId } = req.params
		const places = await Place.find({ category: { $in: [categoryId] } }).populate({
			path: 'nearestCity',
			select: 'name',
		})
		return res.status(200).json(places)
	} catch (error) {
		return res.status(404).json({ error: 'Unauthorized Access!' })
	}
}

exports.recommendsPlace = async (req, res) => {
	const givenData = req.body
	try {
		const { data } = await axios.post(`${process.env.FLASK_API_URL}/recommends`, givenData)
		const nearByPlaceName = data.userData.near_you.map((item) => item.place_name.toLowerCase())
		const recommendedPlaceName = data.userData.special_recommendation.map((place) =>
			place.toLowerCase()
		)

		const nearByPlaceDetails = await Place.find({
			name: { $in: nearByPlaceName },
		})
		const recommendedPlaceDetails = await Place.find({
			name: { $in: recommendedPlaceName },
		})

		nearByPlaceDetails.map((place) => {
			data.userData.near_you.map((placeObj) => {
				if (place.name === placeObj.place_name.toLowerCase()) {
					const placeDistance = placeObj.distance
					place.placeDis = placeDistance
				}
			})
		})

		return res.status(200).json({
			data: { nearByPlaceDetails, recommendedPlaceDetails },
		})
	} catch (err) {
		console.log(err)
		return res.status(402).json({ error: 'An error has occured' })
	}
}

exports.createPlace = async (req, res) => {
	const { name, description, nearestCity, category, stayPlace, featuredImgUrl } = req.body
	const URL =
		'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=name%2Crating%2Cuser_ratings_total%2Cgeometry'
	try {
		const { data } = await axios.get(
			`${URL}&input=${name}&inputtype=textquery&language=en&key=${key}`
		)
		const { candidates } = data

		if (data.status !== 'OK') {
			throw new Error('Something went wrong')
		}

		const {
			geometry: { location },
			rating,
			user_ratings_total,
		} = candidates[0]

		const place = new Place({
			name,
			images: { featuredImg: featuredImgUrl },
			description,
			nearestCity,
			category,
			stayPlace,
			rating,
			userRatingsTotal: user_ratings_total,
			lat: location.lat,
			lng: location.lng,
		})
		await place.save()
		return res.status(200).json(place)
	} catch (error) {
		npmlog.error(error.message)
		return res.status(400).json({ error: 'Cannot save place in db' })
	}
}

exports.uploadPlaceFeaturedImg = async (req, res) => {
	try {
		if (!req.imgUrl) {
			throw new Error('Unable to upload image, sth went wrong.')
		}
		return res.status(200).json({
			message: 'Upload was successful',
			featuredImgURL: req.imgUrl,
		})
	} catch (error) {
		return res.status(400).json({
			error: error.message ? error.message : error,
		})
	}
}

exports.updatePlace = async (req, res) => {
	let { name, placePhoto, category, stayPlace, description } = req.body
	const place = req.place

	name = name || place.name
	placePhoto = placePhoto || place.placePhoto
	category = category || place.category
	stayPlace = stayPlace || place.stayPlace
	description = description || place.description

	try {
		place.name = name
		place.placePhoto = placePhoto
		place.category = category
		place.stayPlace = stayPlace
		place.description = description

		await place.save()
		return res.status(200).json({ data: place })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: 'Cannot save place in db' })
		return
	}
}

exports.getAllPlace = async (req, res) => {
	try {
		const places = await Place.find({})
			.populate({
				path: 'reviews',
				select: 'user reviewText rating -_id',
				populate: {
					path: 'user',
					select: 'name profileImgURL',
				},
			})
			.populate({
				path: 'stayPlace',
				select: 'name rating stayType hotelPhotoUrl -_id',
			})
			.exec()

		return res.status(200).json(places)
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error: 'Error fetching places from DB' })
	}
}

exports.getRandomPlaces = async (_req, res) => {
	try {
		const places = await Place.aggregate([{ $sample: { size: 5 } }, { $project: { name: 1 } }])
		return res.status(200).json(places)
	} catch (error) {
		npmlog.error(error.message)
		return res.status(400).json({ error: 'Error fetching places from DB' })
	}
}

exports.deletePlace = async (req, res) => {
	try {
		const deletedPlace = await Place.findByIdAndDelete({ _id: req.place._id })
		return res.status(200).json({ deletedPlace })
	} catch (error) {
		res.status(400).json({ error: 'Cannot delete place from db' })
		return
	}
}
