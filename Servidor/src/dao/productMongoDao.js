import productModel from "./models/products.model.js";

export default class ProductMongoDao {
  getAll = async () => await productModel.find().exec();
  getById = async (id) => await productModel.findById(id).exec();
  getByName = async (productName) => {
    return productModel.find({ title: new RegExp(productName, "i") }).exec();
  };
  getByCategory = async (productCategory) => {
    return productModel
      .find({ category: new RegExp(`^${productCategory}$`, "i") })
      .exec();
  };
  create = async (data) => await productModel.create(data);
  update = async (id, data) =>
    await productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  delete = async (id) => await productModel.findByIdAndDelete(id);
}
