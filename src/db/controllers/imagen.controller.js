const Imagen = require('../../mongoSchemas/imagenSchema');
const Publicacion = require('../../mongoSchemas/publicacionSchema');

const getImagenes = async (_, res) => {
  try {
    const imagenes = await Imagen.find()
      .populate('publicacionId', 'titulo contenido');
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getImagenById = async (req, res) => {
  try {
    const imagen = await Imagen.findById(req.params.imagenId)
      .populate('publicacionId', 'titulo contenido');
    res.status(200).json(imagen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createImagen = async (req, res) => {
  try {
    const { url } = req.body;
    const { publicacionId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId);
    const nuevaImagen = await Imagen.create({
      url,
      publicacionId
    });
    res.status(201).json(nuevaImagen);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteImagen = async (req, res) => {
  try {
    const imagen = await Imagen.findByIdAndDelete(req.params.imagenId);
    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getImagenesByPublicacionId = async (req, res) => {
  try {
    const { publicacionId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId);
    const imagenes = await Imagen.find({ publicacionId }).populate('publicacionId', 'titulo contenido');
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getImagenes,
  getImagenById,
  createImagen,
  deleteImagen,
  getImagenesByPublicacionId
};
