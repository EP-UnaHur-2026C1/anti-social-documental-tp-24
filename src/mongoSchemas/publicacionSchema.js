const Joi = require("joi");

const publicacionSchema = Joi.object({
  descripcion: Joi.string().min(4).max(250).required().messages({
    "string.empty": "La descripcion de la publicacion no puede ser vacía",
    "string.min": "La descripcion tiene que tener al menos 4 caracteres",
    "string.max": "La descripcion tiene que tener como maximo 250 caracteres",
    "any.required": "El atributo descripcion debe existir",
  }),
});

module.exports = publicacionSchema;