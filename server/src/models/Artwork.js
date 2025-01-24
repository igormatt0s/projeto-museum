const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  primaryImageSmall: { type: String, required: true },
  primaryImage: { type: String, required: true },
  title: { type: String, required: true },
  objectDate: { type: String, required: true },
  artistDisplayName: { type: String, required: true },
  artistNationality: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  objectName: { type: String, required: true },
  department: { type: String, required: true },
  accessionYear: { 
    type: Number,
    default: () => new Date().getFullYear()
  },
});

module.exports = mongoose.model('Artwork', artworkSchema, 'artworks');
