const express = require('express');
const router = express.Router();
const { getPublicaciones, getPublicacionesByUsuarioId, getPublicacionById, deletePublicacion } = require('../controllers/publicacion.controller');
const { createImagenByPublicacionId, getImagenesByPublicacionId } = require('../controllers/imagen.controller');
const { createComentario, getComentariosByPublicacionId, deleteComentarioByPublicacionId } = require('../controllers/comentario.controller')
const { addTagToPublicacion } = require('../controllers/tag.controller')
const { validarPublicacionById, validarComentarioById, validarImagenById } = require('../middlewares/validacionesById.middleware')

router.get('/', getPublicaciones); // localhost:5000/publicaciones
router.get('/:publicacionId', validarPublicacionById, getPublicacionById);
router.delete('/:publicacionId', validarPublicacionById, deletePublicacion);

//Ruta para imagenes (requiere publicacionId)
router.get('/:publicacionId/imagenes', validarPublicacionById, getImagenesByPublicacionId);
router.post('/:publicacionId/imagenes', validarPublicacionById, createImagenByPublicacionId);

//Para comentarios (requieren publicacionId)
router.get('/:publicacionId/comentarios', validarPublicacionById, getComentariosByPublicacionId)
router.post('/:publicacionId/comentarios', validarPublicacionById, createComentario);
router.delete('/:publicacionId/comentarios/:comentarioId', validarPublicacionById, validarComentarioById, deleteComentarioByPublicacionId)

//Para tags (requieren publicacionId)
router.post('/:publicacionId/tags', validarPublicacionById, addTagToPublicacion);

module.exports = router;