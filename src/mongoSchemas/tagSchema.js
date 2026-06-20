const Joi = require("joi");

const tagSchema = Joi.object({
  etiqueta: Joi.string().min(4).max(30).required().messages({
    "string.empty": "La etiqueta del tag no puede ser vacía",
    "string.min": "La etiqueta tiene que tener al menos 4 caracteres",
    "string.max": "La etiqueta tiene que tener como maximo 30 caracteres",
    "any.required": "El atributo etiqueta debe existir",
  }),
});

module.exports = tagSchema;