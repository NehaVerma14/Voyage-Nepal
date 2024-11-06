const { Storage } = require('@google-cloud/storage')
const path = require('path')
const multer = require('multer')

const storage = new Storage({
	keyFilename: path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS),
	projectId: process.env.PROJECT_ID,
})

exports.bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET)

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true)
	} else {
		req.multerError = { error: 'Please upload an Image!' }
		cb(null, false)
	}
}

exports.upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: multerFilter,
	limits: {
		fileSize: 2 * 1024 * 1024, //not more than 1 MB
	},
})
