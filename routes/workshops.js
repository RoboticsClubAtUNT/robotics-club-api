module.exports = function(router) {
  
  router.route('/api/workshops')

    .post(function(req, res) {
      res.json({
        data: "post"
      });
    })

    .get(function(req, res) {
      res.json({
        data: "get"
      });
    });

  router.route('/api/workshop/:id')

    .get(function(req, res) {
      res.json({
        data: "get " + req.params.id
      });
    })

    .delete(function(req, res) {
      res.json({
        data: "delete " + req.params.id
      });
    })

    .patch(function(req, res) {
      res.json({
        data: "patch " + req.params.id
      });
    });
}
