const express = require('express');
const app = express();
const { connectToDatabase } = require('./db/mongodb');
const usuarioRoutes = require('./db/routes/usuario.route');

const PORT = process.env.PORT ?? 4000;

app.use(express.json());

app.use('/usuarios', usuarioRoutes);

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