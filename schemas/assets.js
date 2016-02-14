// assets schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssetSchema = new Schema({
  name: String,
  description: String,
  url: String,
  quantity: Number,
  storageLocation: String,
  unitOfMeasure: String,
  cost: Number,
  created: Date,
  updated: Date
});

module.exports = mongoose.model("Asset", AssetSchema);
