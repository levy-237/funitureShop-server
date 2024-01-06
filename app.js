const express = require("express");
const app = express();
require("express-async-errors");
const connectDB = require("./database/connect");
const productsRouter = require("./routers/products");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>STORE API</h1><a href="/api/v1/products">LINK</a>');
});
app.use("/api/v1/products", productsRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("APP IS LISTENING...");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
