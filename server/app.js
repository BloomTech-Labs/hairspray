require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const User = require('./models/User');
const Stylist = require('./models/Stylist');

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/hairspray';
const routes = require('./routes');

app.use(express.static(path.join(__dirname, '../hairspray-app/build')));

// connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB is connected');
    // FOR TESTING ONLY - DROPS ALL USERS FROM DATABASE
    // FOR TESTING ONLY - DROPS ALL STYLISTS FROM DATABASE
    db === 'mongodb://localhost:27017/hairspray'
      ? User.collection.deleteMany()
      : null;
    db === 'mongodb://localhost:27017/hairspray'
      ? Stylist.collection.deleteMany()
      : null;
    db === 'mongodb://localhost:27017/hairspray'
      ? console.log('TABLES DROPPED')
      : null;
  })
  .catch(err => console.log(err));

app.use(express.json());
app.use(helmet());
app.use(cors());

const whitelist = [
  'http://localhost:5000',
  'https://obscure-island-58835.herokuapp.com/'
];

app.use(
  cors({
    origin: whitelist,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
  })
);
app.options('*', cors());

routes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/hairspray-app/build/index.html'));
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
