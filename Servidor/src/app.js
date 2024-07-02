import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import clientsRouter from "./routers/clients.router.js";
import productsRouter from "./routers/products.router.js";
import historyRouter from "./routers/history.router.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const app = express();
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/history", historyRouter);

try {
  await mongoose.connect(MONGO_URI, {
    dbName: MONGO_DB_NAME,
  });
  app.listen(PORT, () => console.log(`SERVER UP, listen on port ${PORT}`));
} catch (error) {
  console.error(error);
}
