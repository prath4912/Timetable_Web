const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  timetable : {
    type: [],
    required: true,
  },
  year : 
  {
    type : String ,
  } ,
  dept : {
    type : String
  },
  slots : {
    type : []
  },
  electiveClassesPerWeek : {
    type :Number
  },
  honorClassesPerWeek : {
    type :Number
  }
  
},{ timestamps: true } );



const Timetable = mongoose.model("Timetable", timetableSchema);
module.exports = Timetable ;