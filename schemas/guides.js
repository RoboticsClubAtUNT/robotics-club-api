var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GuideSchema = new Schema({
  title: String,
  body: String,
  created: Date,
  updated: Date,
  tags: [String]
});

module.exports = mongoose.model("Guide", GuideSchema);
