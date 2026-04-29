const express = require('express');
const router = express.Router();

//traer los datos de data/peliculas.js
const db = require('../data/peliculas')

// Aquí va la lógica de tus estadísticas
router.get('/estadisticas', (req, res) => {
   res.json(db.getStats())  
});

module.exports = router;
