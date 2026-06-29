const mongoose = require('mongoose');
const Imagen = require('./imagenSchema');
const Comentario = require('./comentarioSchema');

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

//Middlewares para eliminar comentarios y referencias a imágenes asociados a la publicación al eliminarla
publicacionSchema.pre('findOneAndDelete', async function () {
  const publicacionId = this.getQuery()._id;
  await Imagen.updateMany(
    { publicacionId },
    { $unset: { publicacionId: "" } } //elimina la referencia
  );
  await Comentario.deleteMany({ publicacionId });
});

publicacionSchema.pre('findByIdAndDelete', async function () {
  const publicacionId = this.getQuery()._id;
  await Imagen.updateMany(
    { publicacionId },
    { $unset: { publicacionId: "" } }
  );
  await Comentario.deleteMany({ publicacionId });
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
