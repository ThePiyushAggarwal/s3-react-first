const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  fName: String,
  imageUrls: {
    type: [String],
  },
})

module.exports = mongoose.model('User', userSchema)
