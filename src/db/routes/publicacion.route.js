const express = require('express');
const router = express.Router();
const { getPublicaciones, getPublicacionesByUsuarioId, getPublicacionById } = require('../controllers/publicacion.controller');
const { createImagen, getImagenesByPublicacionId } = require('../controllers/imagen.controller');
const { createComentario, getComentariosByPublicacionId, deleteComentarioByPublicacionId } = require('../controllers/comentario.controller')

router.get('/', getPublicaciones);
router.get('/:publicacionId', getPublicacionById);

//Ruta para imagenes (requiere publicacionId)
router.get('/:publicacionId/imagenes', getImagenesByPublicacionId);
router.post('/:publicacionId/imagenes', createImagen);

//Para comentarios (requieren publicacionId)
router.get('/:publicacionId/comentarios', getComentariosByPublicacionId)
router.post('/:publicacionId/comentarios', createComentario);
router.delete('/:publicacionId/comentarios', deleteComentarioByPublicacionId)

module.exports = router;