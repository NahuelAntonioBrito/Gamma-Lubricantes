import express from "express";
import mongoose from "mongoose";
import clientsRouter from "./routers/clients.router.js";
import productsRouter from "./routers/products.router.js";
import historyRouter from "./routers/history.router.js";

const PORT = 8080;

const app = express();
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/history", historyRouter);

try {
  await mongoose.connect(
    "mongodb+srv://lubricantesgamma33:gammaLUBRI1@cluster0.ngmtb0c.mongodb.net/",
    {
      dbName: "GammaLubricantes",
    }
  );
  app.listen(PORT, () => console.log(`SERVER UP, listen on port ${PORT}`));
} catch (error) {
  console.error(error);
}
