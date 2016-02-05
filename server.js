var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var vhost = require('vhost');
//
// function createVirtualHost(domainName, dirPath) {
//   return vhost(domainName, express.static(dirPath));
// }

var app = express();

// var clientHost = createVirtualHost("www.untrobotics.com", 'dist');
// var adminHost = createVirtualHost("admin.untrobotics.com", 'admin');
//
// app.use(clientHost);
// app.use(adminHost);

mongoose.connect("mongodb://roboticsclub:roboticsclub@ds059682.mongolab.com:59682/untrobo");
//
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function() {
  console.log("Successfully connected to MongoLab...")
});


app.use(express.static('dist'));
app.use(express.static('admin'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH');
  next();
});

var port = process.env.PORT || 8080;

var router = express.Router();

require('./routes/workshops')(router);
require('./routes/guides')(router);
require('./routes/blogs')(router);


router.route("/admin/*")
  .get(function(req, res) {
    var options = {
      root: __dirname + "/admin/"
    };

    res.sendFile("index.html", options, function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log("Served Admin App!!!");
      }
    });
  });

router.route("/*")
  .get(function(req, res) {
    var options = {
      root: __dirname + "/dist/"
    };

    res.sendFile("index.html", options, function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log("Served Web App!!!");
      }
    });
  });


app.use('/', router);

var server = app.listen(port, function() {
  console.log("Magic is happening on port %s...", server.address().port);
});
