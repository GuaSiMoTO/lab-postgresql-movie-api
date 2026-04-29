## Responde estas preguntas (puedes escribirlas como comentarios en un archivo NOTAS.md):

## 1. ¿Por qué es mejor tener el controlador separado de las rutas?

Por ser mejor al organizar , al leer y/o buscar fallos. La ruta sabe si llega una request y el controlador sabe donde sacar los datos y crear la respuesta JSON, cada uno hace lo suyo.

## 2. Si mañana quisieras cambiar los datos en memoria por una base de datos PostgreSQL, ¿en qué archivo harías el cambio principalmente?

Hará el cambio en data/peliculas.js. Aquí traería los datos desde la BD y luego sería llamada desde controllers/peliculasController.js

## 3. ¿Qué pasaría si en el router tuvieras /:id antes que /:id/resenas? Pruébalo y describe el resultado.

Que el orden importa. habrá consufión. Si por ejemplo poner:

```js
router.get('/:id', listarResenas)
router.get('/:id', obtenerPelicula)
```

en este caso, nunca entrará a obtenerPeliculas, siempre te listará la reseña del id del GET.