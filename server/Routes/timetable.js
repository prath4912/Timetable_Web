const Teacher = require("../Models/Teacher") ;
const Subject = require("../Models/Subject") ;
const Lab = require("../Models/Lab") ;
const TimeTable = require("../Models/Timetable")
const express = require("express") ;

const router = express.Router() ;

router.post("/generate" ,async (req,res)=>{

    console.log("Generating TimeTable") ;
    console.log(req.body) ;
    const {dept ,year} = req.body ;

    const ans = [] ;
    const subjects = await Subject.find({dept , year}) ;
    const labs = await Lab.find({dept , year}) ;
    

    const noOfDivisions = req.body.nodiv ;
    const working_days = 6 ;
    const timeslots = 6 ;
    const noSubjects = subjects.length ;
    const lab_no = labs.length ;

    const check = {} ;
    const tech = req.body.arr ;


    const elehon = [] ;
    for(let o = 0 ; o<6 ; o++)
    {   
        elehon[o] = [] ;
        for(let p = 0 ; p<6 ;p++)
        {
            elehon[o][p] = 0 ;
        }
    }
    let  elecount = 4  ;
    let  hocount = 4 ;
    const eleindex = [] ;

    for(let ehc = 0 ;ehc< elecount ; ehc = ehc +2)
    {
        var day ;
        var k ;
        do{
            day =  Math.floor((Math.random()*5)) ;
            k   =  Math.floor((Math.random()*6)) ;
        }while(elehon[k][day]==1 || ((k&1)==1)) ;

        elehon[k][day] = 1 ;
        elehon[k+1][day] =1 ;
        eleindex[ehc] = { "slot" : 0 , "day" : 0 } ;
        eleindex[ehc+1] = { "slot" : 0 , "day" : 0 } ;

        eleindex[ehc]["slot"] = k ;
        eleindex[ehc]["day"] = day ;
        eleindex[ehc+1]["slot"] = k+1 ;
        eleindex[ehc+1]["day"] = day ;
    }
    const honindex = [] ;

    for(let ehc = 0 ;ehc< hocount ; ehc = ehc +2)
    {
        var day ;
        var k ;
        do{
            day =  Math.floor((Math.random()*5)) ;
            k   =  Math.floor((Math.random()*6)) ;
        }while(elehon[k][day]==1 || ((k&1)==1)) ;

        elehon[k][day] = 1 ;
        elehon[k+1][day] =1 ;
        honindex[ehc] = { "slot" : 0 , "day" : 0 } ;
        honindex[ehc+1] = { "slot" : 0 , "day" : 0 } ;
        honindex[ehc]["slot"] = k ;
        honindex[ehc]["day"] = day ;
        honindex[ehc+1]["slot"] = k+1 ;
        honindex[ehc+1]["day"] = day ;
    }

    for(let i = 0; i<subjects.length; i++)
    {
        subjects[i].teachers  = await Teacher.find({subject : subjects[i].name , dept ,year  }) ;

        subjects[i].teachers.forEach(element => {
            check[element.name] = [] ;
            for(let o = 0 ; o<6 ; o++)
            {   
                check[element.name][o] = [] ;
                for(let p = 0 ; p<6 ;p++)
                {
                    check[element.name][o][p] = 0 ;
                }
            }
        });
    }   

    for(var v = 0 ; v<noOfDivisions ; v++)
    {
        const timetabledata = [] ;

        for(let o = 0 ; o<6 ; o++)
        {  
            timetabledata[o] = [] ;
            for(let p = 0 ; p<6 ;p++)
            {
                timetabledata[o][p] = { teacher : null , subject : null ,status : 0} ;
            }
        }

        console.log("Div" + (v+1)) ;
        for(var i = 0 ;i<noSubjects ; i++)
        {
            // console.log(subjects[i].name)
            subjects[i].noOfClassesPerWeek = subjects[i].noOfClassesPerWeek1  ;
        }
        // console.log("f1") ;

        for(var i = 0 ; i<lab_no ; i++)
        {
            labs[i].noOfLabsPerWeek = labs[i].noOfLabsPerWeek1 ;
        }

        timetabledata[0][5].lab = "AUDIT COURSE" ;
        timetabledata[0][5].status = 1 ;

        timetabledata[1][5].lab = "AUDIT COURSE";
        timetabledata[1][5].status = 1 ;

        timetabledata[2][5].lab = "HON SEMINAR" ;
        timetabledata[2][5].status = 1 ;

        timetabledata[3][5].lab = "HON SEMINAR";
        timetabledata[3][5].status = 1 ;

        timetabledata[4][5].lab = "HON SEMINAR" ;
        timetabledata[4][5].status = 1 ;

        timetabledata[5][5].lab = "HON SEMINAR";
        timetabledata[5][5].status = 1 ;

        // console.log("f2") ;

        eleindex.forEach((ele)=>{

            timetabledata[ele["slot"]][ele["day"]].status = 1 ;
            timetabledata[ele["slot"]][ele["day"]].subject = "ELECTIVE"  ;
            timetabledata[ele["slot"]][ele["day"]].teacher = "TEMP"  ;
        })

        honindex.forEach((ele)=>{
            timetabledata[ele["slot"]][ele["day"]].status = 1 ;
            timetabledata[ele["slot"]][ele["day"]].subject = "HONORS"  ;
            timetabledata[ele["slot"]][ele["day"]].teacher = "TEMP"  ;
        })
    
        let day = Math.floor((Math.random()*6)) ;
    
        while(true)
        { 
            let flag1 = true ;
            // console.log("f3") ;
            for( let i = 0 ; i <lab_no  ; i++ )
            {
                // console.log("f4") ;
                let count  = labs[i].noOfLabsPerWeek ;
                while(count>0)
                {
                    // console.log("f5") ;

                    flag1 = false ;
                    let flag = true ;
                    for(var k = 0 ; k<working_days ; k = k+2)
                    {
                        if(timetabledata[k][day].status == 0)
                        {
                            flag = false ;
                            break ;
                        }
                    }

                    if(flag)
                    {
                        day = (day==working_days-1) ? 0 : day+1 ;
                        continue;
                    }

                    let random ;
                    do{
                        // console.log("f8") ;
                        random =  Math.floor((Math.random()*6)) ;
                    }while( ( (random&1)==1) || (timetabledata[random][day].status!=0) || (timetabledata[random+1][day].status!=0) ) ;

                    // console.log(labs[i].name) ;
                    timetabledata[random][day].lab = labs[i].name ;
                    timetabledata[random][day].status = 1 ;

                    timetabledata[random+1][day].lab = labs[i].name ;
                    timetabledata[random+1][day].status = 1 ;

                    count-- ;
                    day = day== working_days-1 ? 0 : day + 1 ;
                    labs[i].noOfLabsPerWeek-- ;
                    // console.log("f9") ;

                    break ;
                }
            }

            if(flag1)
            {
                break ;
            }
        }

        console.log("Labs : " ) ;

        // for(var a= 0 ; a<6 ; a++)
        // {
        //     var str = "" ;
        //     for(var b = 0 ; b<6 ; b++ )
        //     {
        //         if(timetabledata[a][b].status==0)
        //         {
        //             // console.log(timetabledata[a][b])
        //             str += "temp" + " " ;
        //         }else
        //         {
        //             str += (timetabledata[a][b].lab ) + " " ;
        //         }
        //     }
        //     console.log(str) ;
        // }
    
        day =   Math.floor((Math.random()*6)) ;
 
     

    while(true)
    {
        day =   Math.floor((Math.random()*6)) ;
        var flag1 = true ;
        for( var i = 0 ; i<noSubjects  ; i++ )
        {
            day = Math.floor((Math.random()*6)) ;
            var count  = subjects[i].noOfClassesPerWeek ;
            const csub = subjects[i].name ;
            const cteach = tech[v][csub] ;
            console.log(csub) ;
                console.log(cteach) ;
                
            while(count>0)
            {
                flag1 = false ;
                var flag = true ;
                for(var k = 0 ; k<timeslots ; k++)
                {
                    console.log(timetabledata[k][day].status) ;
                    console.log(check[cteach][k][day]) ;
                    if(timetabledata[k][day].status == 0 && (( check[cteach][k][day])==0) )
                    {
                        flag = false ;
                        break ;
                    }
                }

                if(flag)
                {
                    day = day==working_days-1 ? 0 : day+1 ;
                    continue;
                }

                var random ;
                do{
                    random =  Math.floor((Math.random()*6)) ; 
                }while( (timetabledata[random][day].status!=0) || (check[cteach][random][day])==1) ;

                timetabledata[random][day].subject = csub ;
                timetabledata[random][day].status = 1 ;
                
                timetabledata[random][day].teacher = cteach ;

                check[cteach][random][day] = 1 ;

                count-- ;
                day = day== working_days-1 ? 0 : day+1 ;
                subjects[i].noOfClassesPerWeek-- ;

                  
                    // subjects[i].teachers.forEach(element => {
                    //     console.log(element.name) ;
                    //     console.log(check[element.name]) ;

                    // });
                
            }
        }

        
        for(let i = 0; i<subjects.length; i++)
        {    
            subjects[i].teachers.forEach(element => {
                console.log(element.name) ;
                console.log(check[element.name]) ;

            });
        } 

        if(flag1)
        {
            break ;
        }
    }
    console.log("  ") ;
    for(var a= 0 ; a<6 ; a++)
    {
        var str = "" ;
        for(var b = 0 ; b<6 ; b++ )
        {
            if(timetabledata[a][b].status==0 )
            {
                // console.log(timetabledata[a][b])
                str += "tp " + "tp" + " " ;
            }else if(timetabledata[a][b].lab!=null)
            {
                str += (timetabledata[a][b].lab ) + " " + "tp" + " " ;
            }else
            {
                str += (timetabledata[a][b].subject ) + " " +timetabledata[a][b].teacher + " "  ;
            }
        }
        console.log(str) ;
    }

    ans[v] = timetabledata ;
    }

    console.log(req.body.rules) ;
    const TimeTable_item = await TimeTable.create({timetable : ans , slots : req.body.rules,dept, year})
    console.log(TimeTable_item) ;
    res.send(TimeTable_item) ;
})


router.post("/get" ,async (req,res)=>{
    const {dept ,year} = req.body ;
    const item = await TimeTable.find({dept, year}) ;
    res.send(item) ;
})

router.get("/getall" ,async (req,res)=>{
    const item = await TimeTable.find() ;
    res.send(item) ;
})

router.post("/getbyid" ,async (req,res)=>{
   
    const item = await TimeTable.findById(req.body._id) ;
    res.send(item) ;
})

module.exports = router;