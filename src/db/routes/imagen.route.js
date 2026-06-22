const express = require('express');
const router = express.Router();
const { getImagenes, getImagenById, createImagen, deleteImagen } = require('../controllers/imagen.controller');
const { validarImagenById } = require('../middlewares/validacionesById.middleware');

router.get('/', getImagenes); // localhost:5000/imagenes
router.get('/:imagenId', validarImagenById, getImagenById);
router.post('/', createImagen);
router.delete('/:imagenId', validarImagenById, deleteImagen);

module.exports = router;