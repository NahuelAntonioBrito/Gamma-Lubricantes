import historyModel from "./models/history.model.js";

export default class HistoryMongoDao {
  getAll = async () => await historyModel.find().exec();
  getById = async (id) => await historyModel.findById(id).exec();
  create = async (data) => await historyModel.create(data);
  update = async (id, data) =>
    await historyModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  delete = async (id) => await historyModel.findByIdAndDelete(id);
}
