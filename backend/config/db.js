const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database Connection Success!')
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

module.exports = connectDB
