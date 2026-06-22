const Imagen = require('../../mongoSchemas/imagenSchema');
const Publicacion = require('../../mongoSchemas/publicacionSchema');

const getImagenes = async (_, res) => {
  try{
    const imagenes = await Imagen.find()
      .populate('publicacionId', 'titulo contenido');
    res.status(200).json(imagenes);
  }
  catch(error){
    next(error);
  }
};

const getImagenById = async (req, res) => {
  try{
    const imagen = await Imagen.findById(req.params.imagenId)
      .populate('publicacionId', 'titulo contenido');
    res.status(200).json(imagen);
  }
  catch(error){
    next(error);
  }
};

const createImagen = async (req, res, next) => {
  try {
    const { url } = req.body;
    const nuevaImagen = await Imagen.create({ url });
    res.status(201).json(nuevaImagen);
  }
  catch (error) {
    next(error);
  }
}

const createImagenByPublicacionId = async (req, res, next) => {
  try {
    const { url } = req.body;
    const { publicacionId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId);
    const existente = await Imagen.findOne({ url, publicacionId });
    if (existente) {
      return res.status(400).json({ error: 'La imagen ya está asociada a esta publicación' });
    }
    const nuevaImagen = await Imagen.create({
      url,
      publicacionId
    });
    res.status(201).json(nuevaImagen);
  } 
  catch (error) {
    next(error);
  }
};

const deleteImagen = async (req, res, next) => {
  try {
    const imagen = await Imagen.findByIdAndDelete(req.params.imagenId);
    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } 
  catch (error) {
    next(error)
  }
};

const getImagenesByPublicacionId = async (req, res) => {
  try{
    const { publicacionId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId);
    const imagenes = await Imagen.find({ publicacionId }).populate('publicacionId', 'titulo contenido');
    res.status(200).json(imagenes);
  }
  catch(error){
    next(error);
  }
};

module.exports = {
  getImagenes,
  getImagenById,
  createImagen,
  deleteImagen,
  getImagenesByPublicacionId,
  createImagenByPublicacionId
};
