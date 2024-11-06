const npmlog = require('npmlog')
const Category = require('../models/categoryModel')

//category extractor
exports.getCategoryById = async (req, res, next, categoryId) => {
	try {
		const category = await Category.findById({ _id: categoryId.toString() })
		req.category = category
		next()
	} catch (error) {
		console.log(error)
		return res.status(404).json({ error: 'Category Not Found IN DB' })
	}
}

exports.getNextCategoryPage = async (req, res) => {
	try {
		const { lastObjectId } = req.params
		let categories
		if (!lastObjectId) {
			categories = await Category.find({}).limit(5)
		} else {
			categories = await Category.find({
				_id: { $gt: lastObjectId.toString() },
			}).limit(5)
		}
		return res.status(200).json({ data: categories })
	} catch (err) {
		console.log(err)
		return res.status(400).json({ error: 'Cannot fetch the next page' })
	}
}

exports.getPreviousCategoryPage = async (req, res) => {
	try {
		const { firstObjectId } = req.params
		let categories
		if (!firstObjectId) {
			categories = await Category.find({}).sort({ _id: -1 }).select('name difficulty').limit(5)
		} else {
			categories = await Category.find({ _id: { $lt: firstObjectId.toString() } })
				.sort({ _id: -1 })
				.select('name difficulty')
				.limit(5)
		}
		return res.status(200).json({ data: categories })
	} catch (err) {
		console.log(err)
		return res.json({ error: 'Cannot fetch Previous page' })
	}
}

exports.createCategory = async (req, res) => {
	const newCat = new Category(req.body)
	try {
		const doc = await newCat.save()
		res.status(200).json({ newCategory: newCat })
	} catch (err) {
		npmlog.error(err)
		res.status(403).json({ error: 'An Error Creating a Category' })
	}
}

exports.deleteCategory = async (req, res) => {
	try {
		const targetCategoryId = req.category._id
		if (!targetCategoryId) {
			throw new Error('Handled by Catch block')
		}

		await Category.findByIdAndRemove({ _id: targetCategoryId })
		return res.status(200).json('Category Successfully deleted')
	} catch (err) {
		return res.status(401).json({ error: 'Category might already be deleted' })
	}
}

exports.updateCategory = async (req, res) => {
	const category = req.category
	category.name = req.body.name
	category.difficulty = req.body.difficulty

	try {
		await category.save()
		res.status(200).json({ data: 'Category updated Successfully' })
	} catch (error) {
		res.status(500).json({ error: 'Could not update a category' })
	}
}

exports.getCategory = (req, res) => {
	if (!req.category) {
		return res.status(404).json({ error: 'Category not found' })
	}

	return res.status(200).json({ data: req.category })
}

exports.getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({})
		return res.status(200).json({ data: categories })
	} catch (error) {
		console.log(error)
		return res.status(404).json({ error: 'NO any categories' })
	}
}
