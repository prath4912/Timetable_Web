const express = require("express")
const connectDB = require("./db")
const cors = require('cors');

const app = express() ;
app.use(cors());

connectDB() ;
// app.use(express.json) ;
app.use(express.json()) ;
app.get("/" , (req,res)=>{ 
    res.send("Tested Sucssefully");
})

app.use("/api/lab" , require("./Routes/lab")) ;
app.use("/api/subject" , require("./Routes/subject")) ;
app.use("/api/elective" , require("./Routes/elective"))
app.use("/api/honors" , require("./Routes/honors")) ;
app.use("/api/teacher" , require("./Routes/teacher")) ;

app.use("/api/timetable" , require("./Routes/timetable"))

app.listen(5000 ,()=>{
    console.log("Connected Sucssesfully") ;
})