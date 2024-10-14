import clientModel from "./models/clients.model.js";

export default class ClientMongoDao {
  getAll = async () => {
    return await clientModel.find().populate({
      path: "history",
      options: { sort: { fecha: -1 } },
    });
  };

  getById = async (id) => {
    return await clientModel.findById(id).populate({
      path: "history",
      options: { sort: { fecha: -1 } },
    });
  };
  getByName = async (clientName) => {
    return clientModel.find({ name: new RegExp(clientName, "i") }).exec();
  };
  create = async (data) => await clientModel.create(data);
  update = async (id, data) =>
    await clientModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  delete = async (id) => await clientModel.findByIdAndDelete(id);
}
