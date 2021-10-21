const mongoose = require('mongoose');

const homeImageSchema = new mongoose.Schema({
	photoUrl: String,
});

homeImageSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('homeImage', homeImageSchema);
