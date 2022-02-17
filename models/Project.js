const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  naslov: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  lokacija: {
    type: String,
    required: true,
    minlength: [2, 'Title can\'t be shorter than 2 characters'],
    maxLength: [32, 'Title can\'t be longer than 64 characters']
  },
  description: {
    type: String,
    required: true,
  },
  opis: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  projDate: {
    type: Date,
    required: true,
  },
  categories: {
    type: Array,
    required: false,
  },
  kategorije: {
    type: Array,
    required: false,
  },
  projImages: {
    type: Array
  },
  coverImage: {
    type: mongoose.Types.ObjectId
  }
});
// TAGS
module.exports = mongoose.model('Project', projectSchema);
