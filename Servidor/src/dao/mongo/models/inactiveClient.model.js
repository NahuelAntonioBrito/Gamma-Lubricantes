import mongoose from "mongoose";

const InactiveClientSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  lastHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "History",
  },
  lastUpdated: { type: Date, required: true },
});

const InactiveClient = mongoose.model("InactiveClient", InactiveClientSchema);

export default InactiveClient;
