const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
	description: {
		type: String,
		minLength: 5,
		required: true,
	},

	owner: {
		type: String,
		required: false,
	},

	rating: {
		type: Number,
	},

	pictureUrl: {
		type: String,
		required: true,
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
