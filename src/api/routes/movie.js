const {
  getMovies,
  postMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movie')

const moviesRouter = require('express').Router()

moviesRouter.get('/', getMovies)
moviesRouter.post('/', postMovie)
moviesRouter.put('/:id', updateMovie)
moviesRouter.delete('/:id', deleteMovie)
module.exports = moviesRouter
