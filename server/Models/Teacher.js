const mongoose = require("mongoose");

const teachersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
    },
    subject: {
      type: String,
    },
    status : {
        type : []
    },
    year : {
        type : String
    }
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teachersSchema);
module.exports = Teacher;
