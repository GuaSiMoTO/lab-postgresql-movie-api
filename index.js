// index.js
require('dotenv').config()
const express = require('express')

const peliculasRouter = require('./src/routes/peliculas')
const estadisticasRouter = require('./src/routes/estadisticas');
const app = express()
const PORT = Number(process.env.PORT) || 4000

// Middleware global
app.use(express.json())

// Rutas
app.use('/api/peliculas', peliculasRouter)

// BONUS: Ruta de estadísticas 
app.use('/api', estadisticasRouter)


// 404 global
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` })
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})