require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connect_db')
const app = express()
const log = require('npmlog')
const port = process.env.PORT || 8000
const environment = process.env.NODE_ENV

app.use(express.static('public'))

//connecting database mongoose
connectDB(environment)

//all middlewares
app.use(express.json())
app.use(cors())

//all routes
const userRoute = require('./routes/userRoutes')
const authRoute = require('./routes/authRoutes')
const categoryRoute = require('./routes/categoryRoutes')
const reviewRoute = require('./routes/reviewRoutes')
const placeRoute = require('./routes/placeRoutes')
const hotresRoute = require('./routes/horecaRoutes')
const coreRoute = require('./routes/coreRoute')
const cityRoute = require('./routes/cityRoutes')
const tripRoute = require('./routes/tripRoute')
const bookmarkRoute = require('./routes/bookmarkRoute')
const { isSignedIn } = require('./middleware/authMiddleware')

app.use('/api', userRoute)
app.use('/api', categoryRoute)
app.use('/api', authRoute)
app.use('/api', reviewRoute)
app.use('/api', placeRoute)
app.use('/api', hotresRoute)
app.use('/api', coreRoute)
app.use('/api', cityRoute)
app.use('/api', tripRoute)
app.use('/api', isSignedIn, bookmarkRoute)

app.listen(port, (err) => {
	if (!err) {
		log.info(`App listening at ${port}`)
	} else {
		log.error(err)
	}
})
