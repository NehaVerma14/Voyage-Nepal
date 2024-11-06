const Place = require("../models/placeModel");


exports.getAvgRatings = async (placeId, reviewLength, rating) => {
    const foundPlace = await Place.findById(placeId)
      .populate({path: "reviews", select: "rating -_id"})
      .exec()

    const totalRating = foundPlace.reviews.reduce((sum, item) => {
      return sum + item.rating;
    }, 0);

    return ((totalRating + rating) / reviewLength).toFixed(2);
}