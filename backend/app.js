const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const cors = require("cors");
require("dotenv").config();
const notFound = require("./middleware/notFound");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGOS_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
