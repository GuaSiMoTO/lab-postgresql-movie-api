// src/controllers/peliculasController.js
//traer los datos de data/peliculas.js
const db = require('../data/peliculas')

// GET /api/peliculas
const listarPeliculas = (req, res) => {
  const { genero } = req.query
  const peliculas = db.getAll(genero)
  res.json(peliculas)
}

// GET /api/peliculas/:id
const obtenerPelicula = (req, res) => {
  const id = Number(req.params.id)
  const pelicula = db.getById(id)

  if (!pelicula) {
    return res.status(404).json({ error: 'Película no encontrada' })
  }

  res.json(pelicula)
}

// POST /api/peliculas
const crearPelicula = (req, res) => {
  const { titulo, director, anio, genero, nota } = req.body

  if (!titulo || !director || !anio || !genero) {
    return res.status(400).json({
      error: 'Los campos titulo, director, anio y genero son obligatorios'
    })
  }

  if (nota !== undefined && (nota < 0 || nota > 10)) {
    return res.status(400).json({ error: 'La nota debe estar entre 0 y 10' })
  }

  const nueva = db.create({
    titulo,
    director,
    anio: Number(anio),
    genero,
    nota: nota !== undefined ? Number(nota) : null
  })

  res.status(201).json(nueva)
}

// PUT /api/peliculas/:id
const actualizarPelicula = (req, res) => {
  const id = Number(req.params.id)
  const { titulo, director, anio, genero, nota } = req.body

  if (!titulo || !director || !anio || !genero) {
    return res.status(400).json({
      error: 'PUT requiere todos los campos: titulo, director, anio, genero'
    })
  }

  const actualizada = db.update(id, { titulo, director, anio: Number(anio), genero, nota: nota ? Number(nota) : null })

  if (!actualizada) {
    return res.status(404).json({ error: 'Película no encontrada' })
  }

  res.json(actualizada)
}

// DELETE /api/peliculas/:id
const eliminarPelicula = (req, res) => {
  const id = Number(req.params.id)
  const eliminada = db.delete(id)

  if (!eliminada) {
    return res.status(404).json({ error: 'Película no encontrada' })
  }

  res.json({ mensaje: 'Película eliminada', pelicula: eliminada })
}



// GET /api/peliculas/:id/resenas
const listarResenas = (req, res) => {
  const peliculaId = Number(req.params.id)
  const pelicula = db.getById(peliculaId)

  if (!pelicula) {
    return res.status(404).json({ error: 'Película no encontrada' })
  }

  const resenas = db.getResenas(peliculaId)
  res.json({ pelicula: pelicula.titulo, resenas })
}

// POST /api/peliculas/:id/resenas
const crearResena = (req, res) => {
  const peliculaId = Number(req.params.id)
  const pelicula = db.getById(peliculaId)

  if (!pelicula) {
    return res.status(404).json({ error: 'Película no encontrada' })
  }

  const { autor, texto, puntuacion } = req.body

  if (!autor || !texto || puntuacion === undefined) {
    return res.status(400).json({
      error: 'Los campos autor, texto y puntuacion son obligatorios'
    })
  }

  if (puntuacion < 1 || puntuacion > 10) {
    return res.status(400).json({ error: 'La puntuacion debe ser entre 1 y 10' })
  }

  const nueva = db.createResena(peliculaId, {
    autor,
    texto,
    puntuacion: Number(puntuacion)
  })

  res.status(201).json(nueva)
}

// BONUS: PATCH cambiar algunos campos
const modificarPelicula = (req, res) => {
  const id = Number(req.params.id);
  
  // 1. Buscamos la película actual para tener los datos existentes
  const peliculaExistente = db.getById(id); 

  if (!peliculaExistente) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }

  // Usamos el Spread Operator para mezclar:
  // Tomamos lo que ya había (...peliculaExistente) 
  // y le encima lo que viene nuevo (...req.body)
  const datosActualizados = { 
    ...peliculaExistente, 
    ...req.body 
  };

  // Aseguramos que los tipos de datos sigan siendo correctos (números)
  if (req.body.anio) datosActualizados.anio = Number(req.body.anio);
  if (req.body.nota) datosActualizados.nota = Number(req.body.nota);

  // Guardamos en la "base de datos"
  const actualizada = db.update(id, datosActualizados);

  res.json(actualizada);
};

// BONUS: Modificar GET/api/peliculas con paginación ?pagina=1&limite=2

const obtenerPorPaginacion = (req, res) => {
  // =btener parámetros de la query con valores por defecto
  const pagina = Number(req.query.pagina) || 1;
  const limite = Number(req.query.limite) || 10;

  // 2. Obtener todas las películas (o las filtradas si tienes búsqueda)
  const todasLasPeliculas = db.getAll(); // asumiendo que db.getAll() devuelve el array completo
  const total = todasLasPeliculas.length;

  // 3. Lógica de paginación
  // El "inicio" es (pagina - 1) * limite. Ej: Pag 2 con limite 2 empieza en el indice 2.
  const inicio = (pagina - 1) * limite;
  const fin = inicio + limite;
  
  const data = todasLasPeliculas.slice(inicio, fin);

  // 4. Calcular total de páginas
  const totalPaginas = Math.ceil(total / limite);

  // 5. Enviar respuesta con la estructura solicitada
  res.json({
    data,
    total,
    pagina,
    totalPaginas
  });
};


module.exports = {
  listarPeliculas,
  obtenerPelicula,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula,
  listarResenas,
  crearResena,
  modificarPelicula,
  obtenerPorPaginacion
}