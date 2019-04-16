require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const CORS = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.MONGODB_URI || "mongodb://localhost:27017/hairspray";
const routes = require("./routes/routes");

app.use(express.static(path.join(__dirname, "../hairspray-app/build")));

// connect to database
mongoose
  .connect(db)
  .then(() => console.log("MongoDB is connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(CORS());

// const REACT_WHITELIST = require("../hairspray-app/src/components/StripeCheckout");

const whitelist = [
  "http://localhost:5000",
  // REACT_WHITELIST,
  "https://obscure-island-58835.herokuapp.com/"
];

app.use(
  CORS({
    origin: whitelist,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"]
  })
);
app.options("*", CORS());

routes(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+'/hairspray-app/build/index.html'));
  // res.sendFile(path.join(`${__dirname  }/hairspray-app/build/index.html`));

});

app.listen(port, () => console.log(`app running on port ${port}`));
