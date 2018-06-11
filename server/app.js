//the dependencies to make app work
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
const router = express.Router();
const mongoUrl =
  process.env.MONGODB_URI || "mongodb://localhost:27017/hairspray";

//Lets connect to the mongo database

try {
  mongoose.connect(
    mongoUrl,
    {
      //Deprecated Mongo Client
    }
  );
} catch (error) {
  console.log(error);
}

let port = 8000 || process.env.PORT;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

//Just to see if server is working

app.get("/", (req, res) => {
  res.json("Test works");
});
