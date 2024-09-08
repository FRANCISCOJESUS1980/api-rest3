const movies = require('../../data/movies')
const Movie = require('../../api/models/movie')
const mongoose = require('mongoose')

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose
  .connect('URL de la BBDD')
  .then(async () => {
    // Buscamos todas las películas de nuestra colección
    const allMovies = await Movie.find()

    // Si existen películas previamente, dropearemos la colección
    if (allMovies.length) {
      await Movie.collection.drop() //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    // Una vez vaciada la colección de las películas, usaremos el array movies de nuestra carpeta data
    // para llenar nuestra base de datos con todas las películas.
    await Movie.insertMany(movies)
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  // Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect())
