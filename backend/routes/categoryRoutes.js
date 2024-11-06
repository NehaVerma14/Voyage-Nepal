const express = require('express')
const router = express.Router()

//controllers
const {
	createCategory,
	updateCategory,
	getAllCategories,
	getCategoryById,
	deleteCategory,
	getCategory,
	getNextCategoryPage,
	getPreviousCategoryPage,
} = require('../controllers/categoryController')
const { getUserById } = require('../controllers/userController')
const { isSignedIn, getUserProfile, isAdmin } = require('../middleware/authMiddleware')

router.param('categoryId', getCategoryById)
router.param('userId', getUserById)

//Read Category by Id
router.get('/category/:categoryId/:userId', isSignedIn, getUserProfile, getCategory)
//get all categories
router.get('/categories/', isSignedIn, getUserProfile, getAllCategories)

router.get(
	'/categories/next-page/:userId/:lastObjectId?',
	isSignedIn,
	getUserProfile,
	isAdmin,
	getNextCategoryPage
)

router.get(
	'/categories/previous-page/:userId/:firstObjectId',
	isSignedIn,
	getUserProfile,
	isAdmin,
	getPreviousCategoryPage
)

//delete category
router.delete('/category/:categoryId/:userId', isSignedIn, getUserProfile, isAdmin, deleteCategory)

//update category
router.put(
	'/category/update/:categoryId/:userId',
	isSignedIn,
	getUserProfile,
	isAdmin,
	updateCategory
)

//create Category
router.post('/category/create', isSignedIn, getUserProfile, isAdmin, createCategory)

module.exports = router
