const Joi = require('joi');

const imagenSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    'string.empty': 'La URL de la imagen no puede ser vacía',
    'string.uri': 'La URL de la imagen debe ser una URL válida',
    'any.required': 'El atributo url debe existir',
  }),
});

module.exports = imagenSchema;