var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkshopSchema = new Schema({
  title: String,
  body: String,
  created: Date,
  updated: Date,
  next: String,
  prev: String,
  first: String,
  last: String,
  mainImageUrl: String,
  relatedGuides: [String]
});

module.exports = mongoose.model("Workshop", WorkshopSchema);
