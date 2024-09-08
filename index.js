require('dotenv').config()

const express = require('express')
const { connectDB } = require('./src/config/db.js')
const app = express()

connectDB()
app.use(express.json())

app.use('/saludar', (req, res) => {
  return res.status(200).json('hola!')
})
app.use('/api/v1/movies', (req, res) => {
  return res.status(200).json('hola!')
})

app.use('*', (req, res, next) => {
  return res.status(404).json('Route Not Found')
})

app.listen(3000, () => {
  console.log('Servidor levantado en: http://localhost:3000')
})

const Character = require('./src/api/models/Character.js')
const moviesRouter = require('./src/api/routes/movie.js')

const router = express.Router()

const getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find()
    return res.status(200).json(characters)
  } catch (error) {
    return res.status(400).json(error)
  }
}

router.get('/characters', getCharacters)

app.use('/characters', router)

const getCharacterById = async (req, res) => {
  const id = req.params.id
  try {
    const character = await Character.findById(id)
    if (character) {
      return res.status(200).json(character)
    } else {
      return res.status(404).json('No character found by this id')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

router.get('/characters/:id', getCharacterById)

const getCharactersByAlias = async (req, res) => {
  const { alias } = req.params

  try {
    const characterByAlias = await Character.find({ alias: alias })
    return res.status(200).json(characterByAlias)
  } catch (err) {
    return res.status(500).json(err)
  }
}

router.get('/characters/alias/:alias', getCharactersByAlias)

const charactersByAge = async (req, res) => {
  const { age } = req.params

  try {
    const characterByAge = await Character.find({ age: { $gt: age } })
    return res.status(200).json(characterByAge)
  } catch (err) {
    return res.status(500).json(err)
  }
}

router.get('/characters/age/:age', charactersByAge)

app.use('/api/v1/movies', moviesRouter)
