const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    duration: { type: Number, required: true },
    categories: [{ type: String, enum: ['terror', 'comedia', 'misterio'] }],
    img: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Movie = mongoose.model('movies', movieSchema, 'movies')
module.exports = Movie
