//Este archivo está exclusivamente hecho para el import a los middlewares (validacionesById.middleware)
const Usuario = require('./usuarioSchema');
const Publicaciones = require('./publicacionSchema');
const Imagenes = require('./imagenSchema');
const Tags = require('./tagSchema');
const Comentario = require('./comentarioSchema');

module.exports = {
  Usuario,
  Publicaciones,
  Imagenes,
  Tags,
  Comentario
};