const Lab = require("../Models/Lab") ;
const express = require("express") ;

const router = express.Router() ;

router.post("/insert" ,async (req,res)=>{
    console.log("arf") ;
    console.log(req.body) ;
    const item = await Lab.create(req.body) ;
    console.log(item) ;

    res.send("INserted") ;
})

router.post("/get" ,async (req,res)=>{
    const {dept ,year} = req.body ;

    const item =  await Lab.find({dept ,year}) ;
    console.log(item ) ;
    res.send(item) ;
})


router.post("/delete" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const name = req.body.name ;
    const item = await Lab.findOneAndDelete({name : name ,dept,year}) ;
    res.send("Deleted") ;
})


module.exports = router;