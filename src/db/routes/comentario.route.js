const express = require('express');
const router = express.Router();
const { getComentarios, getComentarioById, deleteComentario } = require('../controllers/comentario.controller');
const { validarComentarioById } = require('../middlewares/validacionesById.middleware')

router.get('/', getComentarios); // localhost:5000/comentarios
router.get('/:comentarioId', validarComentarioById, getComentarioById);
router.delete('/:comentarioId', validarComentarioById, deleteComentario);

module.exports = router;