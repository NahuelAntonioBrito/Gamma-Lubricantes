import mongoose from "mongoose";
import historyModel from "./history.model.js";

const clientCollection = "clients";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  auto: { type: String, required: true },
  patente: { type: String, required: true },
  modelo: { type: Number, required: true },
  aceite: { type: String, required: true },
  celular: { type: String, required: true },
  mail: { type: String, required: true },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "History" }],
});

const clientModel = mongoose.model(clientCollection, clientSchema);

export default clientModel;
