import productModel from "./models/products.model.js";

export default class ProductMongoDao {
  getAll = async () => await productModel.find().exec();
  getById = async (id) => await productModel.findById(id).exec();
  getByName = async (productName) => {
    return productModel.find({ title: new RegExp(productName, "i") }).exec();
  };
  getByCategory = async (productCategory, page = 1, limit = 12) => {
    const skip = (page - 1) * limit;
    const query = { category: new RegExp(`^${productCategory}$`, "i") };

    const products = await productModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalProducts = await productModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products,
      totalPages,
      currentPage: page,
      totalProducts,
    };
  };
  getCategories = async () => {
    const products = await productModel.find().exec();
    const categories = new Set();

    products.forEach((product) => {
      if (product.category) {
        categories.add(product.category);
      }
    });

    return Array.from(categories);
  };
  create = async (data) => await productModel.create(data);
  update = async (id, data) =>
    await productModel.findByIdAndUpdate(id, data, {
      new: true,
    });

  delete = async (id) => await productModel.findByIdAndDelete(id);

  getPaginated = async (page = 1, limit = 12) => {
    const skip = (page - 1) * limit;
    const products = await productModel.find().skip(skip).limit(limit).exec();
    const totalProducts = await productModel.countDocuments().exec();
    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products,
      totalPages,
      currentPage: page,
    };
  };
}
