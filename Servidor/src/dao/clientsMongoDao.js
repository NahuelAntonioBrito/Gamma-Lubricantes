import clientModel from "./models/clients.model";

export default class clientMongoDao {
  getAll = async () => await clientModel.find().exec();
  getById = async (id) => await clientModel.findById(id).exec();
  create = async (data) => await clientModel.create(data);
  update = async (id, data) =>
    await clientModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  delete = async (id) => await clientModel.findByIdAndDelete(id);
}
