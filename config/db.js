const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog');
let db = mongoose.connection;

module.exports = db;
