require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet')

const app = express();
const port = process.env.PORT || 5000;
const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/hairspray';
const routes = require('./routes/routes');

app.use(express.static(path.join(__dirname, '../hairspray-app/build')));

// connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(helmet())
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

app.listen(port, () => console.log(`app running on port ${port}`));
