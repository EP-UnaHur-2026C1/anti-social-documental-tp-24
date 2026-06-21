const Usuario = require('../../mongoSchemas/usuarioSchema');

const getUsuarios = async (_, res) => {
  const usuarios = await Usuario.find();
  res.status(200).json(usuarios);
};

const getUsuarioById = async (req, res) => {
  const usuario = await Usuario.findById(req.params.usuarioId);
  res.status(200).json(usuario);
};

const createUsuario = async (req, res) => {
  const usuario = await Usuario.create(req.body);
  res.status(201).json(usuario);
};

module.exports = { getUsuarios, getUsuarioById, createUsuario };