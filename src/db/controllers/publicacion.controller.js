const Publicacion = require('../../mongoSchemas/publicacionSchema');
const Usuario = require('../../mongoSchemas/usuarioSchema');

const getPublicaciones = async (_, res) => {
  try{
    const publicaciones = await Publicacion.find()
      .populate('usuarioId', 'nickname email')
      .populate('tags', 'tag');
    res.status(200).json(publicaciones);
  }
  catch(error){
    next(error);
  }
};

const getPublicacionesByUsuarioId = async (req, res) => {
  try{
    const usuarioId = req.params.usuarioId;
    const publicaciones = await Publicacion.find({ usuarioId })
      .populate('usuarioId', 'nickname email')
      .populate('tags', 'tag');
    res.status(200).json(publicaciones);
  }
  catch(error){
    next(error);
  }
};

const getPublicacionById = async (req, res) => {
  try{
    const publicacion = await Publicacion.findById(req.params.publicacionId)
      .populate('usuarioId', 'nickname email')
      .populate('tags', 'tag');
    res.status(200).json(publicacion);
  }
  catch(error){
    next(error);
  }
};

const createPublicacion = async (req, res, next) => {
  try {
    const { titulo, contenido, tags } = req.body
    const { usuarioId } = req.params;
    const usuario = await Usuario.findById(usuarioId);
    const nuevaPublicacion = await Publicacion.create({
      titulo,
      contenido,
      usuarioId,
      tags
    });
    res.status(201).json(nuevaPublicacion);
  } 
  catch (error) {
    next(error)
  }
};

const deletePublicacion = async (req, res, next) => {
  try {
    const { publicacionId } = req.params;
    const publicacion = await Publicacion.findByIdAndDelete(publicacionId);
    res.status(200).json({ message: 'Publicación eliminada correctamente' });
  }
  catch (error) {
    next(error);
  }
};

const deletePublicacionByUsuarioId = async (req, res, next) => {
  try {
    const { usuarioId, publicacionId } = req.params;
    const publicacion = await Publicacion.findOneAndDelete({ _id: publicacionId, usuarioId });
    res.status(200).json({ message: 'Publicación eliminada correctamente' });
  } 
  catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicaciones,
  getPublicacionesByUsuarioId,
  getPublicacionById,
  createPublicacion,
  deletePublicacion,
  deletePublicacionByUsuarioId };
