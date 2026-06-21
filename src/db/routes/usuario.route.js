const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuarioById, createUsuario } = require('../controllers/usuario.controller');
const { getPublicacionesByUsuarioId, createPublicacion } = require('../controllers/publicacion.controller')

router.get('/', getUsuarios);
router.get('/:usuarioId', getUsuarioById);
router.post('/', createUsuario);

//Para publicaciones (requieren usuarioId)
router.get('/:usuarioId/publicaciones', getPublicacionesByUsuarioId);
router.post('/:usuarioId/publicaciones', createPublicacion);

module.exports = router;