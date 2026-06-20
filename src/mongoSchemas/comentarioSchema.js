const Joi = require("joi");

const comentarioSchema = Joi.object({
    autorNombre: Joi.string().min(2).max(30).required().messages({
    "string.empty": "El nombre del autor no puede ser vacío",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre debe tener como máximo 30 caracteres",
    "any.required": "El atributo autorNombre debe existir",
  }),
  contenido: Joi.string().min(1).max(250).required().messages({
    "string.empty": "El contenido del comentario no puede ser vacío",
    "string.max": "El contenido del comentario tiene que tener como máximo 250 caracteres",
    "any.required": "El atributo contenido debe existir",
  }),
});

module.exports = comentarioSchema;