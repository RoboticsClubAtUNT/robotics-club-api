// assets route
var Asset = require("../schemas/assets.js");

function jsonapify(asset) {

  var data = {};

  if (asset) {
    var attributes = {
      name: asset.name,
      description: asset.description,
      url: asset.url,
      quantity: asset.quantity,
      storageLocation: asset.storageLocation,
      unitOfMeasure: asset.unitOfMeasure,
      cost: asset.cost,
      created: asset.created,
      updated: asset.updated
    };

    data.type = "asset";
    data.id = asset._id;
    data.attributes = attributes;
  } else {
    data = {
      error: {
        attributes: {
          title: "Asset does not exist."
        }
      }
    };
  }

  return data;

}

module.exports = function(router) {

  router.route('/api/v2/assets')
    // [POST] /api/v2/assets

    .post(function(req, res) {
      console.log("[POST] /api/v2/assets");

      console.log(req.body);

      if (req.body.data) {

        var data = req.body.data.attributes;

        var asset = new Asset({
          name: data.name,
          description: data.description,
          url: data.url,
          quantity: data.quantity,
          storageLocation: data.storageLocation,
          unitOfMeasure: data.unitOfMeasure,
          cost: data.cost,
          created: Date.now(),
          updated: Date.now()
        });

        asset.save(function(err) {
          if (err) {
            console.log(err);
            res.json({
              error: err
            });
          } else {
            console.log("A new asset was created.");
            res.json({
              data: jsonapify(asset)
            });
          }
        });
      } else {
        res.json({
          errors: [{
            status: "505",
            title: "Could not get data from the client!"
          }]
        });
      }


    })

    // [GET] /api/v2/assets
    .get(function(req, res) {

      console.log("[GET] /api/v2/assets");
      Asset.find(function(err, assets) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          var data = [];
          assets.forEach(function(asset) {
            data.push(jsonapify(asset));
          });
          res.json({
            data: data
          });
        }
      });

    });

  router.route('/api/v2/assets/:id')

    .get(function(req, res) {

      console.log("[GET] /api/v2/assets/%s", req.params.id);

      Asset.findOne({ _id: req.params.id }, function(err, asset) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          res.json({
            data: jsonapify(asset)
          });
        }
      });

    })

    .delete(function(req, res) {

      console.log("[DELETE] /api/v2/assets/%s", req.params.id);
      Asset.findByIdAndRemove(req.params.id, function(err, asset) {

        if (err) {
          res.json({
            error: err
          });
        } else {
          console.log(asset);
          res.json({
            data: jsonapify(asset)
          });
        }
      });

    })

    .patch(function(req, res) {
      console.log("[PATCH] /api/v2/assets/");
      console.log(req.body.data);

      var updates = {
        name: req.body.data.attributes.name,
        description: req.body.data.attributes.description,
        url: req.body.data.attributes.url,
        quantity: req.body.data.attributes.quantity,
        storageLocation: req.body.data.attributes.storageLocation,
        unitOfMeasure: req.body.data.attributes.unitOfMeasure,
        cost: req.body.data.attributes.cost,
        title: req.body.data.attributes.title,
        body: req.body.data.attributes.body,
        updated: Date.now()
      };

      Asset.findByIdAndUpdate(req.params.id, updates, function (err, asset) {
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
};
