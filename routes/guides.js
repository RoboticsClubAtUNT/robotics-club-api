var Guide = require("../schemas/guides.js");

function jsonapify(guide) {

  var data = {};

  if (guide) {
    var attributes = {
      title: guide.title,
      body: guide.body,
      created: guide.created,
      updated: guide.updated,
      tags: guide.tags,
    }

    data.type = "guide";
    data.id = guide._id;
    data.attributes = attributes;
  } else {
    data: {
      error: {
        attributes: {
          title: "Something"
        }
      }
    }
  }

  return data;

}

module.exports = function(router) {

  router.route('/api/v2/guides')
    // [POST] /api/v2/guides

    .post(function(req, res) {
      console.log("[POST] /api/v2/guides");

      console.log(req.body);

      if (req.body.data) {

        var data = req.body.data.attributes;

        var guide = new Guide({
          title: data.title,
          body: data.body,
          created: Date.now(),
          updated: Date.now(),
          tags: ["some",
                 "tags",
                 "test",
                 "demo",
                 "temporary"]
        });

        guide.save(function(err) {
          if (err) {
            console.log(err);
            res.json({
              error: err
            });
          } else {
            console.log("A new guide was created.");
            res.json({
              data: jsonapify(guide)
            });
          }
        });
      } else {
        res.json({
          errors: [{
            status: "505",
            title: "Could not get data from the client!"
          }]
        })
      }


    })

    // [GET] /api/v2/guides
    .get(function(req, res) {

      console.log("[GET] /api/v2/guides");
      Guide.find(function(err, guides) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          var data = [];
          guides.forEach(function(guide) {
            data.push(jsonapify(guide));
          });
          res.json({
            data: data
          });
        }
      });

    });

  router.route('/api/v2/guides/:id')

    .get(function(req, res) {

      console.log("[GET] /api/v2/guides/%s", req.params.id);

      Guide.findOne({ _id: req.params.id }, function(err, guide) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          res.json({
            data: jsonapify(guide)
          });
        }
      });

    })

    .delete(function(req, res) {

      console.log("[DELETE] /api/v2/guides/%s", req.params.id);
      Guide.findByIdAndRemove(req.params.id, function(err, guide) {

        if (err) {
          res.json({
            error: err
          });
        } else {
          console.log(guide);
          res.json({
            data: jsonapify(guide)
          });
        }
      });

    })

    .patch(function(req, res) {
      console.log("[PATCH] /api/v2/guides/");
      console.log(req.body.data);

      var updates = {
        title: req.body.data.attributes.title,
        body: req.body.data.attributes.body,
        updated: Date.now()
      }

      Guide.findByIdAndUpdate(req.params.id, updates, function (err, guide) {
        if (err) {
          res.json({
            error: err
          });
        } else {
          res.json({
            data: "Updated blog post " + req.params.id
          });
        }
      });
    });
}
