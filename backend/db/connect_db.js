const mongoose = require('mongoose')
const { createNewAdmin } = require('./init_db')
const log = require('npmlog')

const connectDB = (environment) => {
	//connecting database mongoose
	mongoose.connect(environment === 'prod' ? process.env.DB_REMOTE : process.env.DB_LOCAL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	mongoose.connection
		.once('open', async () => {
			log.info('DATABASE CONNECTED SUCCESSFULLY')

			try {
				const doc = await createNewAdmin()
				if (doc) {
					log.info('fyi', 'New Admin has been created!')
				}
			} catch (error) {
				log.error('db error', error)
			}
		})
		.on('error', (err) => {
			console.log(err)
			process.exit(1)
		})
}

module.exports = connectDB
