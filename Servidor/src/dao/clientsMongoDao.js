import clientModel from "./models/clients.model.js";

export default class ClientMongoDao {
  getAll = async () => await clientModel.find().populate("history");
  getById = async (id) => await clientModel.findById(id).populate("history");
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
