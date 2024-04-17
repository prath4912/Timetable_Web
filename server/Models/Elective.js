const mongoose = require("mongoose");

const subjectsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
    },
    year: {
      type: String,
    },
    teacher :{
        type : String ,
    },
  },
  { timestamps: true }
);

const Elective = mongoose.model("Elective", subjectsSchema);

module.exports = Elective;
