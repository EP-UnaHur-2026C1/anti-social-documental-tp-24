const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' 
  },
  tags: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'Tag' 
  }],
  imagenes: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Imagen'
  }]
});

publicacionSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Publicacion = mongoose.model('Publicacion', publicacionSchema);
module.exports = Publicacion;
