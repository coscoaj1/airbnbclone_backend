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

homeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Home', homeSchema);
