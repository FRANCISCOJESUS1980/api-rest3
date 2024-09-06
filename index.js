require('dotenv').config()

const express = require('express')
const { connectDB } = require('./src/config/db.js')
const app = express()

connectDB()

app.use('/saludar', (req, res) => {
  return res.status(200).json('hola!')
})

app.listen(3000, () => {
  console.log('Servidor levantado en: http://localhost:3000')
})
