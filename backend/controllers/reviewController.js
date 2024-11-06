const Review = require('../models/reviewModel')
// const { getAvgRatings } = require('../utils/getAvgRating')

exports.createPlaceReview = async (req, res) => {
	try {
		const userReview = req.body
		userReview.user = req.auth.user._id

		const newReview = new Review(userReview)
		const place = req.place

		const foundValue = place.reviews.findIndex((item) => {
			return userReview.user.toString() == item.user._id
		})

		if (foundValue !== -1) {
			return res.status(400).json({ error: 'You have already reviewed this place ' })
		}

		place.reviews.push(newReview._id)
		place.userRatingsTotal += 1
		place.rating = ((place.rating + userReview.rating) / place.userRatingsTotal).toFixed(2)
		// const avgRating = await getAvgRatings(place.userRatingsTotal, newReview.rating)
		// place.rating = avgRating

		await newReview.save()
		await place.save()

		return res.status(200).json({ message: 'New review has been added' })
	} catch (error) {
		console.log(error)
		res.status(400).json('Cannot Create the User Review')
	}
}

exports.getReviewByUserId = async (req, res) => {
	const userId = req.params.userId

	try {
		const reviews = await Review.find({ user: userId.toString() })
		return res.status(200).json(reviews)
	} catch (error) {
		return res.status(400).json({ error: 'No reviews found' })
	}
}

exports.getPendingReview = async (req, res) => {
	try {
		const reviews = await Review.find({ isApproved: false })

		if (!reviews) {
			throw new Error('No Review Found')
		}

		return res.status(200).json({
			data: reviews,
		})
	} catch (err) {
		return res.status(404).json({ error: err ? err : 'Unknow Error' })
	}
}

exports.approvePendingReview = async (req, res) => {
	try {
		const { reviewId, approvedFlag } = req.body
		const userReview = await Review.findOne({ _id: reviewId.toString() })
		userReview.isApproved = approvedFlag
		await userReview.save()

		return res.status(200).json({ data: 'Review Successfully approved ' })
	} catch (err) {
		console.log(err)
		return res.status(400).json({ error: 'Unable to approve user review' })
	}
}

exports.deleteReviewById = async (req, res) => {
	const reviewId = req.params.reviewId

	try {
		await Review.findOneAndDelete({ _id: reviewId.toString() })
		return res.status(200).json({ message: 'Review has been deleted successfully' })
	} catch (err) {
		return res.status(400).json({ error: 'Unable to delete a review' })
	}
}
