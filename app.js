const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors')
const APIs = require('./APIs');
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: allowedMethods,
  credentials: true
}));

app.use('/', APIs);

app.use((req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  next();
});

app.use((req, res, next) => {
  const err = new Error('Request Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
