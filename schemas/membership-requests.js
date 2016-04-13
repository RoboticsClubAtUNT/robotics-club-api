var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var membershipRequestsSchema = new Schema({
  name: String,
  euid: String,
  created: Date,
  updated: Date,
  email: String
});

module.exports = mongoose.model("MembershipRequest", membershipRequestsSchema);
