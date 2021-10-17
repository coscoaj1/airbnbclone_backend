const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  description: {
    type: String,
    minLength: 5,
    required: true,
  },

  title: {
    type: String,
    minLength: 5,
  },

  price: {
    type: Number,
    minLength: 2,
  },

  bedrooms: {
    type: Number,
    minLength: 1,
  },
  beds: {
    type: Number,
    minLength: 1,
  },
  baths: {
    type: Number,
    minLength: 1,
  },

  kitchens: {
    type: Number,
    minLength: 1,
  },

  owner: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
  },

  pictureUrl: {
    type: String,
    required: true,
  },
});

homeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Home", homeSchema);
