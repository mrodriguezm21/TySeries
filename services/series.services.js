const Model = require("../schemas/series.schema");
const boom = require("@hapi/boom");

const addSerie = async (serie) => {
  const { title, description, genre, type, release_date, image, status } =
    serie;
  if (
    !title ||
    !description ||
    !genre ||
    !type ||
    !release_date ||
    !image ||
    !status
  ) {
    throw boom.badRequest("Faltan campos obligatorios");
  }
  const newSerie = {
    ...serie,
    created_at: new Date(),
  };

  try {
    const mySerie = new Model(newSerie);
    return await mySerie.save();
  } catch (error) {
    throw boom.badImplementation("Error interno del servidor");
  }
};

const getSeries = async (filterByTitle) => {
  const filter = filterByTitle ? { title: { $regex: filterByTitle, $options: "i" } } : {};
  //TODO: Implementar paginación (skip, limit)
  try {
    return await Model.find(filter).populate("user", {
      username: 1,
      name: 1,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSerie = async (id) => {
  try {
    const serie = await Model.findById(id).populate("user", {
      username: 1,
      name: 1,
    });
    return serie;
  } catch (error) {
    throw boom.notFound("Serie no encontrada");
  }
};

const updateSerie = async (id, serie) => {
  const newSerie = { ...serie, updated_at: new Date() };
  try {
    const updatedSerie = await Model.findByIdAndUpdate(id, newSerie, {
      new: true,
    });
    return updatedSerie;
  } catch (error) {
    throw boom.notFound("Serie no encontrada");
  }
};

module.exports = {
  create: addSerie,
  list: getSeries,
  listOne: getSerie,
  update: updateSerie,
};
