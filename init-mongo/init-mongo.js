db = db.getSiblingDB("unahur");

// Limpiar colecciones para un arranque limpio de la base de prueba.
db.usuarios.drop();
db.publicaciones.drop();
db.imagenes.drop();
db.tags.drop();
db.comentarios.drop();

// Índices útiles para la integridad de los datos.
db.usuarios.createIndex({ nickname: 1 }, { unique: true });
db.tags.createIndex({ tag: 1 }, { unique: true });

// Usuarios base para que el frontend tenga datos visibles desde el inicio.
const usuariosInsertados = db.usuarios.insertMany([
  {
    nickname: "Luca",
    email: "luca@unahur.edu.ar",
    password: "123456"
  },
  {
    nickname: "Nora",
    email: "nora@unahur.edu.ar",
    password: "nora2026"
  },
  {
    nickname: "Martin",
    email: "martin@unahur.edu.ar",
    password: "martin123"
  },
  {
    nickname: "Sol",
    email: "sol@unahur.edu.ar",
    password: "solpass"
  }
]);

const usuarioLucaId = usuariosInsertados.insertedIds[0];
const usuarioNoraId = usuariosInsertados.insertedIds[1];
const usuarioMartinId = usuariosInsertados.insertedIds[2];
const usuarioSolId = usuariosInsertados.insertedIds[3];

// Tags iniciales para categorizar publicaciones.
const tagsInsertados = db.tags.insertMany([
  { tag: "documental" },
  { tag: "memoria" },
  { tag: "festival" },
  { tag: "cultura" }
]);

const tagDocumentalId = tagsInsertados.insertedIds[0];
const tagMemoriaId = tagsInsertados.insertedIds[1];
const tagFestivalId = tagsInsertados.insertedIds[2];
const tagCulturaId = tagsInsertados.insertedIds[3];

// Imágenes de ejemplo para mostrar contenido en el frontend.
const imagenesInsertadas = db.imagenes.insertMany([
  {
    url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    descripcion: "Fotografía de un documental en rodaje.",
    createdAt: new Date()
  },
  {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    descripcion: "Escena de entrevista de archivo.",
    createdAt: new Date()
  },
  {
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
    descripcion: "Póster de un festival de cine comunitario.",
    createdAt: new Date()
  }
]);

const imagen1Id = imagenesInsertadas.insertedIds[0];
const imagen2Id = imagenesInsertadas.insertedIds[1];
const imagen3Id = imagenesInsertadas.insertedIds[2];

// Publicaciones iniciales.
db.publicaciones.insertMany([
  {
    titulo: "Documental en construcción",
    contenido: "Estamos trabajando en un relato sobre la memoria de los barrios y las historias que quedaron en el archivo.",
    usuarioId: usuarioLucaId,
    tags: [tagDocumentalId, tagMemoriaId],
    imagenes: [imagen1Id, imagen2Id]
  },
  {
    titulo: "Primer corte del documental",
    contenido: "Compartimos el primer corte con los colaboradores para recibir feedback sobre el ritmo y la narrativa.",
    usuarioId: usuarioNoraId,
    tags: [tagDocumentalId],
    imagenes: [imagen3Id]
  },
  {
    titulo: "Festival de relatos comunitarios",
    contenido: "El próximo encuentro reunirá a cineastas, investigadores y vecinos para discutir el valor del archivo audiovisual.",
    usuarioId: usuarioMartinId,
    tags: [tagFestivalId, tagCulturaId],
    imagenes: []
  }
]);

const publicacionDocumental = db.publicaciones.findOne({ titulo: "Documental en construcción" });
const publicacionCorte = db.publicaciones.findOne({ titulo: "Primer corte del documental" });

// Comentarios de ejemplo para mostrar interacción en la interfaz.
db.comentarios.insertMany([
  {
    contenido: "Me encanta esta propuesta; la mirada sobre la memoria colectiva es muy fuerte.",
    usuarioId: usuarioNoraId,
    publicacionId: publicacionDocumental._id,
    createdAt: new Date()
  },
  {
    contenido: "Este material de archivo puede aportar muchísima riqueza al relato final.",
    usuarioId: usuarioMartinId,
    publicacionId: publicacionDocumental._id,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 240)
  },
  {
    contenido: "Quisiera aportar imágenes del festival del año pasado para ampliar el contexto.",
    usuarioId: usuarioSolId,
    publicacionId: publicacionCorte._id,
    createdAt: new Date()
  }
]);