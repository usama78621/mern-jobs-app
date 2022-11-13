const express = require("express");
const connectDB = require("./db/connect");
const app = express();
require("dotenv").config();
require("express-async-errors");
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorhandler");
const auth = require("./routes/auth");
const jobs = require("./routes/jobs");
const authentication = require("./middleware/auth");

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(fileUpload({ useTempFiles: true }));



const port = process.env.PORT || 5000;

app.use("/auth", auth);
app.use("/jobs", authentication, jobs);

app.use(errorHandlerMiddleware);
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
