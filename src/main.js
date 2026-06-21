const express = require('express');
const app = express();
const { connectToDatabase } = require('./db/mongodb');

const usuarioRoutes = require('./db/routes/usuario.route');
const tagRoutes = require('./db/routes/tag.route')
const publicacionRoutes = require('./db/routes/publicacion.route');
const imagenRoutes = require('./db/routes/imagen.route');
const comentarioRoutes = require('./db/routes/comentario.route');

const PORT = process.env.PORT ?? 4000;

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/tags', tagRoutes);
app.use('/publicaciones', publicacionRoutes);
app.use('/imagenes', imagenRoutes);
app.use('/comentarios', comentarioRoutes);

app.listen(PORT, async (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  try {
    await connectToDatabase();
    console.log(`App iniciada en http://localhost:${PORT}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});