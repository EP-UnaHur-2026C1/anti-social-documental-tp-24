const Tag = require('../../mongoSchemas/tagSchema');
const redisClient = require('../redis');

const getTags = async (_, res) => {
  try{
    const cached = await redisClient.get('tags');
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }
    const tags = await Tag.find();
    await redisClient.setEx('tags', 60, JSON.stringify(tags)); //muy raramente se crearán tags, por lo que se puede cachear por más tiempo
    res.status(200).json(tags);
  }
  catch(error){
    next(error);
  }
};

const getTagById = async (req, res) => {
  try{
    const tag = await Tag.findById(req.params.tagId);
    res.status(200).json(tag);
  }
  catch(error){
    next(error);
  }
};

const createTag = async (req, res, next) => {
  try{
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  }
  catch (error) {
    next(error)
  }
};

const addTagToPublicacion = async (req, res, next) => {
  try {
    const { tagId } = req.body;
    const { publicacionId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId);
    if (publicacion.tags.includes(tagId)) {
      return res.status(400).json({ error: 'La etiqueta ya está asociada a esta publicación' });
    }
    publicacion.tags.push(tagId);
    await publicacion.save();
    res.status(201).json(publicacion);
  } 
  catch (error) {
    next(error);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const tag = await Tag.findByIdAndDelete(tagId);
    res.status(200).json({ message: 'Tag eliminado correctamente' });
  } 
  catch (error) {
    next(error);
  }
};

const getTagsByPublicacionId = async (req, res) => {
  try {
    const { publicacionId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId).populate('tags');
    res.status(200).json(publicacion.tags);
  } 
  catch (error) {
    next(error);
  }
};

const deleteTagFromPublicacion = async (req, res, next) => {
  try {
    const { publicacionId, tagId } = req.params;
    const publicacion = await Publicacion.findById(publicacionId);
    publicacion.tags.pull(tagId);
    await publicacion.save();
    res.status(200).json({ message: 'Tag eliminado de la publicación correctamente' });
  }
  catch (error) {
    next(error);
  }
};

module.exports = { getTags, getTagById, createTag, addTagToPublicacion, deleteTag, getTagsByPublicacionId, deleteTagFromPublicacion };