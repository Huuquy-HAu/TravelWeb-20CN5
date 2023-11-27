const mongoose = require('mongoose')
require('dotenv').config()
const {MONGO_URL_LOCAL} = process.env
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL_LOCAL)
  .then(() => console.log('Connected!'));

module.exports = mongoose