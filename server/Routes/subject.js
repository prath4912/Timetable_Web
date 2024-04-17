const Subject = require("../Models/Subject") ;
const Teacher = require("../Models/Teacher")
const express = require("express") ;

const router = express.Router() ;

router.post("/insert" ,async (req,res)=>{
    const item = await Subject.create(req.body) ;
    res.send("INserted") ;
})


router.post("/get" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const item =  await Subject.find({dept,year}) ;    
    res.send(item ) ;
})


router.post("/delete" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const name = req.body.name ;
    const item = await Subject.findOneAndDelete({name : name , dept ,year}) ;
    res.send("Deleted") ;
})


module.exports = router;