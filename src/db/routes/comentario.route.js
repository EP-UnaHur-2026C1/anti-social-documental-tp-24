const express = require('express');
const router = express.Router();
const { getComentarios, getComentarioById, deleteComentario } = require('../controllers/comentario.controller');

router.get('/', getComentarios);
router.get('/:comentarioId', getComentarioById);
router.delete('/:comentarioId', deleteComentario);

module.exports = router;