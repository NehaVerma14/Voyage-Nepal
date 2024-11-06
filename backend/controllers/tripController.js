const npmlog = require('npmlog')
const City = require('../models/cityModel')
const Trip = require('../models/tripPlanModel')

exports.createNewTrip = async (req, res) => {
	try {
		const newTrip = new Trip({
			userId: req.auth.id,
			...req.body,
		})
		const doc = await newTrip.save()
		res.status(200).json(doc)
	} catch (err) {
		npmlog.error(err)
		res.status(403).json({ error: 'Error creating a trip' })
	}
}

exports.getDistinctTripCity = async (req, res) => {
	try {
		const doc = await Trip.find({ userId: req.auth.id }).distinct('cityId')
		const city = await City.find({ _id: { $in: doc } }, 'name')
		res.status(200).json(city)
	} catch (err) {
		npmlog.error(err)
		return res.status(403).json({ error: 'Error creating a trip' })
	}
}

exports.getUserPlanByCity = async (req, res) => {
	try {
		const doc = await Trip.find({ userId: req.auth.id, cityId: req.params.cityId })
			.populate('placeId', 'name rating')
			.sort({ travelDate: 'asc' })
		return res.status(200).json(doc)
	} catch (error) {
		npmlog.error(error)
		return res.status(404).json({ error: 'No Plan Found!' })
	}
}

exports.deleteTrip = async (req, res) => {
	try {
		await Trip.findOneAndDelete({
			_id: req.params.tripId,
			userId: req.auth.id,
		})
		return res.status(200).json({ message: 'Trip has been successfully deleted!' })
	} catch (err) {
		npmlog.error(err)
		res.status(403).json({ error: 'Unable to delete a trip!' })
	}
}
