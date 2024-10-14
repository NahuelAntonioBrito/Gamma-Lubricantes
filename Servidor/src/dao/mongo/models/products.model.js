import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  liters: { type: Number, required: true },
  price: { type: Number, required: true },
  thumbnails: { type: [String], required: true },
  status: { type: Boolean, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  carCompatibility: [
    {
      brand: { type: String },
      model: { type: String },
      year: { type: Number },
    },
  ],
});

productSchema.pre("save", function (next) {
  if (this.category !== "Aceite") {
    this.carCompatibility = undefined;
  }
  next();
});

productSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    if (ret.category !== "Aceite") {
      delete ret.carCompatibility;
    }
    return ret;
  },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
