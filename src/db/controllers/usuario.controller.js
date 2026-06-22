const Usuario = require('../../mongoSchemas/usuarioSchema');

const getUsuarios = async (_, res) => {
  try{
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  }
  catch(error){
    next(error);
  }
};

const getUsuarioById = async (req, res) => {
  try{
    const usuario = await Usuario.findById(req.params.usuarioId);
    res.status(200).json(usuario);
  }
  catch(error){
    next(error);
  }
};

const createUsuario = async (req, res, next) => {
  try{
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  }
  catch(error){
    next(error);
  }
};

const deleteUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.usuarioId);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } 
  catch (error) {
    next(error);
  }
};

module.exports = { getUsuarios, getUsuarioById, createUsuario, deleteUsuario };