var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require(__root + "auth/VerifyToken");

router.use(bodyParser.urlencoded({ extended: true }));
var Todo = require("./Todo");

// CREATES A NEW TODO
router.post("/", VerifyToken, function(req, res) {
  console.log(req.userId);
  Todo.create(
    {
      todo: req.body.todo,
      createdBy: req.userId
    },
    function(err, todo) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(todo);
    }
  );
});

// RETURNS ALL THE todos IN THE DATABASE
router.get("/", function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err)
      return res.status(500).send("There was a problem finding the todos.");
    res.status(200).send(todos);
  });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get("/:id", function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!todo) return res.status(404).send("No todo found.");
    res.status(200).send(todo);
  });
});

// DELETES A USER FROM THE DATABASE
router.delete("/:id", function(req, res) {
  Todo.findByIdAndRemove(req.params.id, function(err, todo) {
    if (err)
      return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("Todo: " + todo.name + " was deleted.");
  });
});

// // UPDATES A SINGLE USER IN THE DATABASE
// // Added VerifyToken middleware to make sure only an authenticated user can put to this route
// router.put(
//   "/:id",
//   /* VerifyToken, */ function(req, res) {
//     User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
//       err,
//       user
//     ) {
//       if (err)
//         return res.status(500).send("There was a problem updating the user.");
//       res.status(200).send(user);
//     });
//   }
// );

module.exports = router;
