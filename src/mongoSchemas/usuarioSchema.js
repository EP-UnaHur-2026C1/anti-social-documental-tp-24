const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nickname: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, {
  collection: 'usuarios',
  timestamps: false 
});

usuarioSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;