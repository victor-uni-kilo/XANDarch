const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    //unique: true //collectiuon ensure index deprecation;
  },
  role: {
    type: String
    //find  way of getting it in
  },
  password: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('User', userSchema);

