var mongoose = require("mongoose");
var TodoSchema = new mongoose.Schema(
  {
    todo: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);
mongoose.model("Todo", TodoSchema);

module.exports = mongoose.model("Todo");
