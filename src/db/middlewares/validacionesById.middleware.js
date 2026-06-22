const { Usuario, Publicaciones, Imagenes, Tags, Comentario } = require('../../mongoSchemas');

const validarById = require('./generic.middleware');
const validarUsuarioById = validarById(Usuario, "usuarioId");
const validarImagenById = validarById(Imagenes, "imagenId");
const validarComentarioById = validarById(Comentario, "comentarioId");
const validarTagById = validarById(Tags, "tagId");
const validarPublicacionById = validarById(Publicaciones, "publicacionId");

module.exports = {
  validarUsuarioById,
  validarImagenById,
  validarComentarioById,
  validarTagById,
  validarPublicacionById
};