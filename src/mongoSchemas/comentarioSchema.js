const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  contenido: { 
    type: String, 
    required: true 
  },
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  publicacionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Publicacion', 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  collection: 'comentarios',
  timestamps: false
});

comentarioSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Comentario = mongoose.model('Comentario', comentarioSchema);
module.exports = Comentario;