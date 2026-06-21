const Publicacion = require('../../mongoSchemas/publicacionSchema');
const Usuario = require('../../mongoSchemas/usuarioSchema');

const getPublicaciones = async (_, res) => {
  try {
    const publicaciones = await Publicacion.find()
      .populate('usuarioId', 'nickname email')
      .populate('tags', 'tag');
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPublicacionesByUsuarioId = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;
    const publicaciones = await Publicacion.find({ usuarioId })
      .populate('usuarioId', 'nickname email')
      .populate('tags', 'tag');
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPublicacionById = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id)
      .populate('usuarioId', 'nickname email')
      .populate('tags', 'tag');
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.status(200).json(publicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPublicacion = async (req, res) => {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPublicaciones, getPublicacionesByUsuarioId, getPublicacionById, createPublicacion };
