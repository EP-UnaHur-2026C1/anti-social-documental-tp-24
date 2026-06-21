const express = require('express');
const router = express.Router();
const { getImagenes, getImagenById, deleteImagen } = require('../controllers/imagen.controller');

router.get('/', getImagenes);
router.get('/:imagenId', getImagenById);
router.delete('/:imagenId', deleteImagen);

module.exports = router;