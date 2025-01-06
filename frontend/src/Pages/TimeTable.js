import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import jsPDF from 'jspdf';
import 'jspdf-autotable';



export default function TimeTable() {
     let { id } = useParams();
    const [timetable , settimetable] = useState([]) ;     
    const[slots , setslots] = useState([]) ;
     useEffect(()=>{
        gettimetable() ;
     } ,[]) ;
     const BaseUrl = process.env.REACT_APP_BASE_URL ;


     const gettimetable = async()=>{
        const response = await axios.post(`${BaseUrl}/api/timetable/getbyid` , {_id : id});
        setslots(response.data.slots) ;
        settimetable(response.data.timetable) ;
     }

     const handleExportPDF = () => {
        timetable.forEach((ele , index)=>{
            const doc = new jsPDF();
            doc.autoTable({ html: `#my-table${index}` });
            doc.save(`Division_${index+1}.pdf`);
        })
      };

  return (
    <div className='pt-20' >
             <button className='bg-black text-white float-end mx-20 px-3 py-1 rounded' onClick={handleExportPDF} >Save Pdf</button>

     <div className="mx-20 mt-10  py-6 " id='my-table' >
        {timetable.map((ele, index) => {
          return (
            <div className="my-4" >
              <h1 className="bg-black text-white p-2 font-bold text-center py-4 border" >TimeTable For Division {index + 1}</h1>
              <table  className=" border-2 border-black text-center w-full" id={`my-table${index}`}>
                <thead>
                  <tr className="border-2 border-black p">
                    <th className="border-2 border-black py-3">Time</th>
                    <th className="border-2 border-black">Monday</th>
                    <th className="border-2 border-black">Tuesday</th>
                    <th className="border-2 border-black">Wednesday</th>
                    <th className="border-2 border-black">Thursday</th>
                    <th className="border-2 border-black">Friday</th>
                    <th className="border-2 border-black">Saturday</th>
                  </tr>
                </thead>
                <tbody>
                  {ele.map((ele1 , index) => {
                   

                    return (
                      <>
                      <tr className="border-2 border-black">
                        <td>{slots[index]}</td>
                        {ele1.map((item) => {
                          if (item.status == 0) {
                            return <td className="border-2  py-3 border-black">{" "}</td>;
                          } else if (item.lab != null) {
                            if((index&1)==1)
                            {
                              return ;
                            }
                            return (
                              <td rowSpan={2} className="border-2 bg-slate-300  py-3 border-black">
                                {" "}
                                {item.lab}
                              </td>
                            );
                          } else {
                            return (
                              <td className="border-2  py-3 border-black">
                                {" "}
                                <div>
                                  {item.subject} <br /> {item.teacher}
                                </div>{" "}
                              </td>
                            );
                          }
                        })}
                      </tr>
                      {
                         (index==1 || index==3) && <tr className='text-center' ><td className="border-2  py-3 border-black"></td><td colSpan={7}  className='text-center bg-neutral-300' >  Break</td></tr>
                        
                      }
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  )
}
