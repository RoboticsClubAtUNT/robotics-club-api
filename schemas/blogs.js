var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: String,
  body: String,
  created: Date,
  updated: Date,
  author: String
});

module.exports = mongoose.model("Blog", BlogSchema);
