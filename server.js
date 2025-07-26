/**
 * @file server.js
 * @description This file is the entry point for the backend authentication demo application.
 */
require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3333');
});