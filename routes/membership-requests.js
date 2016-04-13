var MembershipRequest = require("../schemas/membership-requests.js");

function jsonapify(membershipRequest) {

  var data = {};

  if (membershipRequest) {
    var attributes = {
      name: membershipRequest.name,
      euid: membershipRequest.euid,
      created: membershipRequest.created,
      updated: membershipRequest.updated,
      email: membershipRequest.email,
    };

    data.type = "membershipRequest";
    data.id = membershipRequest._id;
    data.attributes = attributes;
  } else {
    data = {
      error: {
        attributes: {
          title: "Something"
        }
      }
    };
  }

  return data;

}

module.exports = function(router) {

  router.route('/api/v2/membership-requests')
    // [POST] /api/v2/membership-requests

    .post(function(req, res) {
      console.log("[POST] /api/v2/membership-requests");

      console.log(req.body.data);

      if (req.body.data) {

        var data = req.body.data.attributes;

        var membershipRequest = new MembershipRequest({
          name: data.name,
          euid: data.euid,
          created: Date.now(),
          updated: Date.now(),
          email: data.email
        });

        membershipRequest.save(function(err) {
          if (err) {
            console.log(err);
            res.json({
              error: err
            });
          } else {
            console.log("A new membership request was created.");
            res.json({
              data: jsonapify(membershipRequest)
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

    // [GET] /api/v2/membership-requests
    .get(function(req, res) {

      console.log("[GET] /api/v2/membership-requests");
      MembershipRequest.find(function(err, membershipRequests) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          var data = [];
          membershipRequests.forEach(function(membershipRequest) {
            data.push(jsonapify(membershipRequest));
          });
          res.json({
            data: data
          });
        }
      });

    });

  router.route('/api/v2/membership-requests/:id')

    .get(function(req, res) {

      console.log("[GET] /api/v2/membership-requests/%s", req.params.id);

      MembershipRequest.findOne({ _id: req.params.id }, function(err, membershipRequest) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          res.json({
            data: jsonapify(membershipRequest)
          });
        }
      });

    })

    .delete(function(req, res) {

      console.log("[DELETE] /api/v2/membership-requests/%s", req.params.id);
      MembershipRequest.findByIdAndRemove(req.params.id, function(err, membershipRequest) {

        if (err) {
          res.json({
            error: err
          });
        } else {
          console.log(membershipRequest);
          res.json({
            data: jsonapify(membershipRequest)
          });
        }
      });

    })

    .patch(function(req, res) {
      console.log("[PATCH] /api/v2/membership-requests/");
      console.log(req.body.data);

      var updates = {
        name: req.body.data.attributes.name,
        euid: req.body.data.attributes.euid,
        updated: Date.now(),
        email: req.body.data.attributes.email
      };

      MembershipRequest.findByIdAndUpdate(req.params.id, updates, function (err, membershipRequest) {
        if (err) {
          res.json({
            error: err
          });
        } else {
          res.json({
            data: "Updated membership request " + req.params.id
          });
        }
      });
    });
};
