const Elective = require("../Models/Elective") ;
const express = require("express") ;

const router = express.Router() ;

router.post("/insert" ,async (req,res)=>{
    const item = await Elective.create(req.body) ;
    res.send("Inserted") ;
})

router.post("/get" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const item =  await Elective.find({dept , year}) ;
    res.send(item ) ;
})


router.post("/delete" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const name = req.body.name ;
    const item = await Elective.findOneAndDelete({name : name , dept ,year}) ;
    res.send("Deleted") ;
})


module.exports = router;