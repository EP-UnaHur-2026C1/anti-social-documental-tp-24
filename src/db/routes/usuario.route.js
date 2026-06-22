const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuarioById, createUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const { getPublicacionesByUsuarioId, createPublicacion, deletePublicacionByUsuarioId } = require('../controllers/publicacion.controller')
const { validarUsuarioById, validarPublicacionById, validarComentarioById } = require('../middlewares/validacionesById.middleware')

router.get('/', getUsuarios); // localhost:5000/usuarios
router.get('/:usuarioId', validarUsuarioById, getUsuarioById);
router.post('/', createUsuario);
router.delete('/:usuarioId', validarUsuarioById, deleteUsuario);

//Para publicaciones (requieren usuarioId)
router.get('/:usuarioId/publicaciones', validarUsuarioById, getPublicacionesByUsuarioId);
router.post('/:usuarioId/publicaciones', validarUsuarioById, createPublicacion);
router.delete('/:usuarioId/publicaciones/:publicacionId', validarUsuarioById, validarPublicacionById, deletePublicacionByUsuarioId);

module.exports = router;