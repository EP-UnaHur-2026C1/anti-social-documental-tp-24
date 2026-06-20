const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuarioById, createUsuario } = require('../controllers/usuario.controller');

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);

module.exports = router;