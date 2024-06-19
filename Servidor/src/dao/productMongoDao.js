import productModel from "./models/products.model";

export default class HistoryMongoDao {
  getAll = async () => await productModel.find().exec();
  getById = async (id) => await productModel.findById(id).exec();
  create = async (data) => await productModel.create(data);
  update = async (id, data) =>
    await productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  delete = async (id) => await productModel.findByIdAndDelete(id);
}
