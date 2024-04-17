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
      type: String ,
    },
    noOfClassesPerWeek: {
      type: Number,
    },
    noOfClassesPerWeek1: {
      type: Number,
    },
    teachers :{
        type : [] ,
        default : [] 
    },
    
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectsSchema);

module.exports = Subject;
