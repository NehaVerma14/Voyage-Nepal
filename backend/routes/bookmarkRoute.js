const express = require('express')
const router = express.Router()

//controllers
const {
	createNewBookmark,
	getBookmarkDetail,
	deleteBookmark,
} = require('../controllers/bookmarkController')

//create a Bookmark
router.post('/bookmark/create', createNewBookmark)

//delete a Bookmark
router.delete('/bookmark/:bookmarkId/delete', deleteBookmark)

//Get user Bookmark plan
router.get('/bookmark/my', getBookmarkDetail)

module.exports = router
