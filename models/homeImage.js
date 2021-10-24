const mongoose = require('mongoose');

const homeImageSchema = new mongoose.Schema({
	photoUrl: String,
	description: String,
	title: String,
	price: Number,
	guests: Number,
	bedrooms: Number,
	beds: Number,
	baths: Number,
	kitchens: Number,
	wifi: Boolean,
	air_conditioning: Boolean,
	parking: Boolean,
	rating: Number,
	reviews: Number,
});

homeImageSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('homeImage', homeImageSchema);
