var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://roboticsclub:roboticsclub@ds059682.mongolab.com:59682/untrobo");
//
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
  console.log("Successfully connected to MongoLab...")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 8080;

var router = express.Router();

require('./routes/workshops')(router);
require('./routes/guides')(router);
require('./routes/blogs')(router);

router.route("/*")

  .get(function(req, res) {
    res.json({
      data: "wildcard"
    });
  });

app.use('/', router);

var server = app.listen(port, function() {
  console.log("Magic is happening on port %s...", server.address().port);
});
