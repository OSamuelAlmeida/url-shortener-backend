const mongoose = require('mongoose')

const ShortURLSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  fullURL: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  numberOfClicks: { type: Number, default: 0 }
})

module.exports = mongoose.model('ShortURL', ShortURLSchema)