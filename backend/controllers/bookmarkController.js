const npmlog = require('npmlog')
const Bookmark = require('../models/bookmarkModel')

exports.createNewBookmark = async (req, res) => {
	try {
		const newBookmark = new Bookmark({
			userId: req.auth.id,
			placeId: req.body.placeId,
		})
		const doc = await newBookmark.save()
		return res.status(200).json(doc)
	} catch (err) {
		npmlog.error(err)
		return res.status(403).json({ error: 'Duplicate bookmark!' })
	}
}

exports.getBookmarkDetail = async (req, res) => {
	try {
		const doc = await Bookmark.find({ userId: req.auth.id }).populate('placeId')
		return res.status(200).json(doc)
	} catch (error) {
		npmlog.error(error)
		return res.status(404).json({ error: 'No any Bookmark. Try adding some!' })
	}
}

exports.deleteBookmark = async (req, res) => {
	try {
		await Bookmark.findOneAndDelete({
			_id: req.params.bookmarkId,
			userId: req.auth.id,
		})
		return res.status(200).json({ message: 'Removed from bookmark!' })
	} catch (err) {
		npmlog.error(err)
		return res.status(403).json({ error: 'Unable to removed from bookmark!' })
	}
}
