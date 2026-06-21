const validarById = (modelo, paramName = "id") => {
  return async (req, res, next) => {
    const id = req.params[paramName];
    const instance = await modelo.findByPk(id);
    if (!instance) {
      res.status(404).json({ error_message: `${modelo.name} con id ${id} no fue encontrado/a.` });
      return;
    }
    next();
  };
};

module.exports = validarById;
