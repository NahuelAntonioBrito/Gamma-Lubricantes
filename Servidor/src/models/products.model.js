import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  liters: { type: Number, required: true },
  price: { type: Number, required: true },
  thumbnails: { type: [String], required: true },
  status: { type: Boolean, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
