const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tripPlanSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			trim: true,
			ref: 'User',
		},
		placeId: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			trim: true,
			ref: 'Place',
		},
		travelDate: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		cityId: {
			type: Schema.Types.ObjectId,
			ref: 'City',
			required: true,
		},
	},
	{ timestamps: true }
)

const TripPlan = mongoose.model('TripPlan', tripPlanSchema)

module.exports = TripPlan
