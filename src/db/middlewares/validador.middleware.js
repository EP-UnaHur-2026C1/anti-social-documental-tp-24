const validador = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errores = Object.keys(err.errors).map(campo => ({
      campo,
      mensaje: err.errors[campo].message
    }));
    return res.status(400).json({ errores });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      error: `El valor para ${Object.keys(err.keyValue)} ya existe`
    });
  }

  res.status(500).json({ error: err.message });
};

module.exports = validador;