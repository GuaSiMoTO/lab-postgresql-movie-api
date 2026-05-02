require('dotenv').config()
const express = require('express')

require('./src/config/db')

const peliculasRouter = require('./src/routes/peliculas')
const estadisticasRouter = require('./src/routes/estadisticas')

const app = express()
const PORT = Number(process.env.PORT) || 4000

app.use(express.json())

app.use('/api/peliculas', peliculasRouter)
app.use('/api', estadisticasRouter)

app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` })
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})