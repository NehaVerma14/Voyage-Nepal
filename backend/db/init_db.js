const User = require('../models/userModel')
const { roleEnum } = require('../controllers/enum')

exports.createNewAdmin = async () => {
	const admin = await User.findOne({
		email: process.env.EMAIL,
	})

	if (!admin) {
		const newAdmin = new User({
			name: process.env.ADMIN_NAME,
			email: process.env.EMAIL,
			DOB: new Date(),
			password: process.env.ADMIN_PASSWORD,
			role: roleEnum.ADMIN,
		})

		return newAdmin.save()
	}
}
