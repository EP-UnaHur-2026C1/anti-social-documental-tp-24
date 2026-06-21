const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: true
  },
  descripcion:{
    type: String,
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
  collection: 'imagenes',
  timestamps: false
});

imagenSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Imagen = mongoose.model('Imagen', imagenSchema);
module.exports = Imagen;