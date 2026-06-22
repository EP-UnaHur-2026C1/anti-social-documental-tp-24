const express = require('express');
const app = express();
const { connectToDatabase } = require('./db/mongodb');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const usuarioRoutes = require('./db/routes/usuario.route');
const tagRoutes = require('./db/routes/tag.route')
const publicacionRoutes = require('./db/routes/publicacion.route');
const imagenRoutes = require('./db/routes/imagen.route');
const comentarioRoutes = require('./db/routes/comentario.route');
const validador = require('./db/middlewares/validador.middleware');

const PORT = process.env.PORT ?? 4000;

app.use(express.json());

app.use('/usuarios', usuarioRoutes); // localhost:5000/usuarios
app.use('/tags', tagRoutes); // localhost:5000/tags
app.use('/publicaciones', publicacionRoutes); // localhost:5000/publicaciones
app.use('/imagenes', imagenRoutes); // localhost:5000/imagenes
app.use('/comentarios', comentarioRoutes); // localhost:5000/comentarios
app.use(validador);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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