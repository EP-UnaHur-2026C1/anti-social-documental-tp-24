const Comentario = require('../../mongoSchemas/comentarioSchema');
const Usuario = require('../../mongoSchemas/usuarioSchema');
const Publicacion = require('../../mongoSchemas/publicacionSchema');

const getComentarios = async (req, res) => {
  try{
    const comentarios = await Comentario.find()
      .populate('usuarioId', 'nickname email')
      .populate('publicacionId', 'titulo contenido');
    res.status(200).json(comentarios);
  }
  catch(error){
    next(error);
  }
};

const getComentarioById = async (req, res) => {
  try{
    const comentario = await Comentario.findById(req.params.comentarioId)
      .populate('usuarioId', 'nickname email')
      .populate('publicacionId', 'titulo contenido');
    res.status(200).json(comentario);
  }
  catch(error){
    next(error);
  }
};

const createComentario = async (req, res, next) => {
  try {
    const { usuarioId, contenido } = req.body;
    const { publicacionId } = req.params;
    const usuario = await Usuario.findById(usuarioId);
    const publicacion = await Publicacion.findById(publicacionId);
    const nuevoComentario = await Comentario.create({
      contenido,
      usuarioId,
      publicacionId
    });
    res.status(201).json(nuevoComentario);
  } 
  catch (error) {
    next(error);
  }
};

const getComentariosByPublicacionId = async (req, res) => {
  try{
    const { publicacionId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId);
    const meses = parseInt(process.env.COMENTARIO_MAX_MESES) || 6; //máxima cantidad de meses que tiene un comentario antes de no mostrarse, default 6 meses
    if (isNaN(meses)) {
      console.warn("Variable de entorno COMENTARIO_MAX_MESES inválida, se usará valor por defecto 6");
    }
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - meses); //devuelve el límite de la fecha que puede tener un comentario

    const comentarios = await Comentario.find({
      publicacionId,
      createdAt: { $gte: fechaLimite } //los comentarios deben ser mayor o igual a fechaLimite para que se muestren
    }).populate('usuarioId', 'nickname email');
    res.status(200).json(comentarios);
  }
  catch(error){
    next(error);
  }
};


const deleteComentarioByPublicacionId = async (req, res, next) => {
  try {
    const { publicacionId, comentarioId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId);
    const comentario = await Comentario.findOneAndDelete({ _id: comentarioId, publicacionId });
    res.status(200).json({ message: 'Comentario eliminado correctamente' });
  } 
  catch (error) {
    next(error);
  }
};

const deleteComentario = async (req, res, next) => {
  try {
    const comentario = await Comentario.findByIdAndDelete(req.params.comentarioId);
    res.status(200).json({ message: 'Comentario eliminado correctamente' });
  } 
  catch (error) {
    next(error);
  }
};

module.exports = {
  getComentarios,
  getComentarioById,
  createComentario,
  getComentariosByPublicacionId,
  deleteComentario,
  deleteComentarioByPublicacionId
};
