const mongoose = require('mongoose')

const Schema = mongoose.Schema

const horecaSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			maxLength: 65,
		},
		pricePerNight: {
			type: Number,
			required: true,
			trim: true,
		},
		address: {
			// streetName: {
			// 	type: String,
			// 	required: true,
			// 	trim: true,
			// },
			zipCode: {
				type: String,
				required: true,
				trim: true,
				maxLength: 5,
			},
			city: {
				type: String,
				required: true,
				trim: true,
				maxLength: 32,
			},
			state: {
				type: Number,
				required: true,
				trim: true,
				min: 1,
				max: 7,
			},
		},
		// lat: {
		// 	type: Number,
		// 	trim: true,
		// 	required: true,
		// },
		// lng: {
		// 	type: Number,
		// 	trim: true,
		// 	required: true,
		// },
		phoneNumber: {
			type: String,
			required: true,
			trim: true,
			maxLength: 10,
			minLength: 7,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 1,
		},
		horecaType: {
			type: String,
			enum: ['Hotel', 'Restaurant', 'Cafe'],
			default: 'Hotel',
		},
		imageUrl: String,
	},
	{ timestamps: true }
)

const Horeca = mongoose.model('Horeca', horecaSchema)

module.exports = Horeca
