const mongoose = require("mongoose");

const labSchema = new mongoose.Schema(
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
    noOfLabsPerWeek: {
      type: Number,
    },
    noOfLabsPerWeek1: {
      type: Number,
    },
    teachers :{
        type : []
    },
  },
  { timestamps: true }
);

const Lab = mongoose.model("Lab", labSchema);

module.exports = Lab;
