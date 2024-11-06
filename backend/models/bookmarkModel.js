const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookmarkSchema = new Schema(
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
	},
	{ timestamps: true }
)

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = Bookmark
