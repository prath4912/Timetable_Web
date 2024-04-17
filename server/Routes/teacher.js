const Subject = require("../Models/Subject");
const Teacher = require("../Models/Teacher") ;
const express = require("express") ;

const router = express.Router() ;

router.post("/insert" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const item = await Teacher.create(req.body) ;
    const ele = await Subject.findOne({name : item.subject , dept , year }) ;
    ele.teachers.push(item.name) ;
    ele.save() ;
    res.send("Inserted") ;
})

router.post("/get" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const item =  await Teacher.find({dept , year}) ;
    res.send(item) ;
})

router.post("/getname" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const item =  await Teacher.find({subject : req.body.subject,  dept , year}) ;
    res.send(item) ;
})

router.post("/delete" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const name = req.body.name ;
    const item = await Teacher.findOneAndDelete({name : name , dept, year}) ;
    const ele  = await Subject.findOne({name : item.subject , dept ,year}  );
    if(ele && ele.teachers!=null)
    {
    ele.teachers = ele.teachers.filter((ele)=>{if(ele!=item.name) return ele}) ;
    ele.save() ;

    }
    res.send("INserted") ;
})

module.exports = router;