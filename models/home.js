const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
	.connect(url)
	.then((result) => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const homeSchema = new mongoose.Schema({
	id: {
		type: Number,
	},

	description: {
		type: String,
	},

	owner: {
		type: String,
	},

	rating: {
		type: Number,
	},

	pictureUrl: {
		type: String,
	},
});

module.exports = mongoose.model('Home', homeSchema);
