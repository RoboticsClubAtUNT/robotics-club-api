var Blog = require("../schemas/blogs.js");

function jsonapify(blog) {

  var data = {};
  var attributes = {
    title: blog.title,
    body: blog.body,
    created: blog.created,
    updated: blog.updated,
    author: blog.author
  }

  data.type = "blog";
  data.id = blog._id;
  data.attributes = attributes;

  return data;

}

module.exports = function(router) {

  router.route('/api/blogs')
    // [POST] /api/blogs

    .post(function(req, res) {
      console.log("[POST] /api/blogs");
      var blog = new Blog({
        title: "Test Title",
        body: "Markdown body",
        created: Date.now(),
        updated: Date.now(),
        author: "Robotics Club @ UNT"
      });

      blog.save(function(err) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          console.log("A new blog was created.");
          res.json({
            data: "The blog was successfully created!"
          });
        }
      });
    })

    // [GET] /api/blogs
    .get(function(req, res) {

      console.log("[GET] /api/blogs");
      Blog.find(function(err, blogs) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          var data = [];
          blogs.forEach(function(blog) {
            data.push(jsonapify(blog));
          });
          res.json({
            data: data
          });
        }
      });

    });

  router.route('/api/blogs/:id')

    .get(function(req, res) {

      console.log("[GET] /api/blogs/%s", req.params.id);
      Blog.findOne({ _id: req.params.id }, function(err, blog) {
        if (err) {
          console.log(err);
          res.json({
            error: err
          });
        } else {
          if (blog) {
            res.json({
              data: jsonapify(blog)
            });
          } else {
            res.json({
              error: "Server error 500"
            });
          }
        }
      });

    })

    .delete(function(req, res) {

      Blog.findByIdAndRemove(req.params.id, function(err, blog) {

        if (err) {
          res.json({
            error: err
          });
        } else {
          res.json({
            data: "Deleted Blog post " + req.params.id
          });
        }
      });

    })

    .patch(function(req, res) {

      var updates = {
        body: "This value was updated.",
        updated: Date.now()
      }

      Blog.findByIdAndUpdate(req.params.id, updates, function (err, blog) {
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
