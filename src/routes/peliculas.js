// src/routes/peliculas.js
const { Router } = require('express')
const {
  listarPeliculas,
  obtenerPelicula,
  buscarPorDirector,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula,
  listarResenas,
  crearResena,
  modificarPelicula,
  obtenerPorPaginacion
} = require('../controllers/peliculasController')

const router = Router()

// Rutas de películas
router.get('/buscar', buscarPorDirector);
router.get('/', listarPeliculas)
router.get('/:id', obtenerPelicula)
router.post('/', crearPelicula)
router.put('/:id', actualizarPelicula)
router.delete('/:id', eliminarPelicula)

//BONUS: PATCH cambiar algunos campos
router.patch('/:id', modificarPelicula);

//BONUS: GET por página
router.get('/', obtenerPorPaginacion);

// Rutas anidadas: reseñas de una película
router.get('/:id', listarResenas)
router.get('/:id/resenas', listarResenas)
router.post('/:id/resenas', crearResena)

module.exports = router