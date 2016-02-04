var Guide = require("../schemas/guides.js");

function jsonapify(guide) {

  var data = {};
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

  return data;

}

module.exports = function(router) {

  router.route('/api/v2/guides')
    // [POST] /api/v2/guides

    .post(function(req, res) {
      console.log("[POST] /api/v2/guides");

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
      Guide.findByIdAndRemove(req.params.id, function(err, guide) {

        if (err) {
          res.json({
            error: err
          });
        } else {
          res.json({
            data: "Deleted Guide " + req.params.id
          });
        }
      });

    })

    .patch(function(req, res) {
      var updates = {
        body: "This value was updated.",
        updated: Date.now()
      }

      Blog.findByIdAndUpdate(req.params.id, updates, function (err, guide) {
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
