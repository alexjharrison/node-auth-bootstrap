var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require(__root + "auth/VerifyToken");

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));
var Todo = require("./Todo");

// CREATES A NEW TODO
router.post("/", VerifyToken, function (req, res) {
  Todo.create(
    {
      todo: req.body.todo,
      createdBy: req.userId,
      public: req.body.public
    },
    function (err, todo) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(todo);
    }
  );
});

// RETURNS ALL THE todos IN THE DATABASE from user
router.get("/", VerifyToken, function (req, res) {
  Todo.find({ 'createdBy': req.userId }, function (err, todos) {
    if (err)
      return res.status(500).send("There was a problem finding the todos.");
    res.status(200).send(todos);
  });
});

// GETS A SINGLE todo FROM THE DATABASE
// router.get("/:id", function (req, res) {
//   Todo.findById(req.params.id, function (err, todo) {
//     if (err)
//       return res.status(500).send("There was a problem finding the user.");
//     if (!todo) return res.status(404).send("No todo found.");
//     res.status(200).send(todo);
//   });
// });

// DELETES A USER FROM THE DATABASE
router.delete("/:id", VerifyToken, function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err, todo) {
    if (err)
      return res.status(500).send("There was a problem deleting the todo.");
    res.status(200).send("Todo: " + todo + " was deleted.");
  });
});

// UPDATES A SINGLE todo IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated todo can put to this route
router.put("/:id", VerifyToken, function (req, res) {
  Todo.findByIdAndUpdate(req.params.id, { $set: { todo: req.body.todo } }, { new: true }, function (
    err,
    todo
  ) {
    if (err)
      return res.status(500).send("There was a problem updating the todo.");
    res.status(200).send(todo);
  });
}
);

module.exports = router;
