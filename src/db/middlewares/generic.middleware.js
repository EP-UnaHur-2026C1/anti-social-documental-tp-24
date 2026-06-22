const validarById = (modelo, paramName = "id") => {
  return async (req, res, next) => {
    try {
      const id = req.params[paramName] || req.body[paramName];
      const instance = await modelo.findById(id);
      if (!instance) {
        return res.status(404).json({ error: `${modelo.modelName} con id ${id} no fue encontrado.` });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = validarById;
