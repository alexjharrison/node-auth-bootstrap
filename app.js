var express = require("express");
var cors = require("cors");
var app = express();
var db = require("./db");
var path = require("path");

global.__root = __dirname + "/";

app.use(cors());

app.get("/api", function (req, res) {
  res.status(200).send("API works.");
});

var UserController = require(__root + "user/UserController");
app.use("/api/users", UserController);

var AuthController = require(__root + "auth/AuthController");
app.use("/api/auth", AuthController);

var TodoController = require(__root + "todo/TodoController");
app.use("/api/todo", TodoController);

app.use(express.static(__dirname + '/client/build'));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;
