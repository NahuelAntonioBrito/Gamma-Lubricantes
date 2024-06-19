import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  descripcion: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
});

const historyModel = mongoose.model("History", historySchema);

export default historyModel;
