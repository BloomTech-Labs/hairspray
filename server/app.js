const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

const CORS = require("cors");

//Paste user api here

const app = express();
const port = process.env.PORT || 5000;
let db = "mongodb://localhost:27017/hairspray";
const routes = require("./routes/routes");

//connect to database

mongoose
  .connect(db)
  .then(() => console.log("MongoDB is connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(CORS());

const whitelist = ["http://localhost:5000"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, PUT, POST, DELETE"
};

// Static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

routes(app);

app.get("/", (req, res) => {
  res.json("This is a blank slate");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
