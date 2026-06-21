const { Usuario, Publicaciones, Imagenes, Tags, Comentario } = require('../../mongoSchemas');
const validarById = require('./generic.middleware');

const validarUsuarioById = validarById(Usuario, "usuarioId");
const validarImagenById = validarById(Imagenes, "imagenId");
const validarComentarioById = validarById(Comentario, "comentarioId");
const validarTagById = validarById(Tags, "tagId");

const genericSchemaValidator = require('../schemas/generic.schemaValidator');
const usuarioSchema = require ('../schemas/usuario.schema');
const publicacionSchema = require('../schemas/publicacion.schema');
const imagenSchema = require('../schemas/imagen.schema');
const comentarioSchema = require('../schemas/comentario.schema');
const tagSchema = require('../schemas/tag.schema');

const errorMapper = (error) => error.details.map((e) => {
    return {
      atributo: e.path.join("."),
      detalle: e.message,
    };
});

const validarSchemaUsuario = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(usuarioSchema, req.body);
  if (error) {
    res.status(400).json({
      errores: errorMapper(error),
    });
    return;
  }
  next();
};

const validarSchemaPublicacion = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(publicacionSchema, req.body);
  if (error) {
    res.status(400).json({
      errores: errorMapper(error),
    });
    return;
  }
  next();
};

const validarPublicacionById = async (req, res, next) => {
  const { usuarioId, publicacionId } = req.params;
  const publicacion = await Publicaciones.findOne({
    where: { id: publicacionId, usuarioId: usuarioId }
  });
  if (!publicacion) {
    return res.status(404).json({ error: `Publicacion con id ${publicacionId} no fue encontrada para el usuario con id ${usuarioId}.` });
  }
  next();
};

const validarSchemaImagen = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(imagenSchema, req.body);
  if (error) {
    res.status(400).json({
      errores: errorMapper(error),
    });
    return;
  }
  next();
};

const validarSchemaComentario = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(comentarioSchema, req.body);
  if (error) {
    res.status(400).json({
      errores: errorMapper(error),
    });
    return;
  }
  next();
};

const validarSchemaTag = (req, res, next) => {
  const { error, _ } = genericSchemaValidator(tagSchema, req.body);
  if (error) {
    res.status(400).json({
      errores: errorMapper(error),
    });
    return;
  }
  next();
};

module.exports = {
  validarUsuarioById,
  validarImagenById,
  validarComentarioById,
  validarTagById,
  validarPublicacionById, 
  validarSchemaUsuario, 
  validarSchemaPublicacion, 
  validarSchemaImagen, 
  validarSchemaComentario, 
  validarSchemaTag
}