import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function CreateTimeTable() {
  const BaseUrl = process.env.REACT_APP_BASE_URL ;

  const [timetables, settimetables] = useState([]);
  const navigate = useNavigate() ;
  useEffect(() => {
    gettimetables();
  }, []);

  const gettimetables = async () => {
    const response = await axios.get(
      `${BaseUrl}/api/timetable/getall`
    );

    settimetables(response.data);
  };

  const [division, setdivision] = useState([
    "Computer-Engineering",
    "Information-Technology",
    "Electronics-and-Communication",
  ]);

  const handleExportPDF = (size) => {
      for(var index = 0 ; index<size  ; index++)
      {
        const doc = new jsPDF();
        doc.autoTable({ html: `#my-table${index}` });
        doc.save(`Division_${index+1}.pdf`);
      }
  };

  const navi = (_id)=>{
    navigate(`/timetable/${_id}`)
  }

  return (
    <div className="bg-stone-200 pt-20  flex h-screen  ">
      <div className="grow mx-10 text-stone-900">
        {division.map((ele) => {
          return (
            <Link to={`${ele}`}>
              <div className=" bg-gray-400 h-40 shadow-lg drop-shadow-xl stroke-fuchsia-600  shadow-black  my-6   border border-neutral-600  rounded-xl  active:scale-90 transition-all">
                <h1 className=" my-auto  text-center  mt-16  font-bold text-2xl ">
                  {ele.replace("-", " ").replace("-", " ")}{" "}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="w-1/4 h-97 bg-neutral-400 mx-4 rounded-lg p-1 overflow-hidden   ">
        <h3 className="text-center font-bold py-2 text-lg text-gray-800">Recent TimeTables</h3>
        <div className=" overflow-y-scroll h-98 rounded-lg" >
        {timetables.map((elem ,index) => {
          const date = new Date(elem.createdAt).toLocaleDateString();

          return (
            <div className=" bg-gray-100 p-2 m-1 rounded-md my-2 border border-slate-500">
              <h2 className="font-bold text-slate-700">
                TimeTable {index+1}{" "}
                <p className="text-sm font-thin float-end"> {date}</p>
              </h2>
              <p>Department : {elem.dept}</p>
              <p>Year : {(elem.year).toUpperCase()}</p>
              <div className="flex gap-2">
                <button onClick={()=>navi(elem._id)} className="bg-blue-400 py-1 my-2 w-full  border-black border   active:scale-90  rounded-2xl text-slate-800 font-bold text-sm transition-all">
                  View
                </button>
                <button  onClick={()=>handleExportPDF(elem.timetable.length)} className="bg-blue-400 py-0.5 my-2 w-full  border-black border rounded-2xl text-slate-800 font-bold text-sm  active:scale-90 transition-all">
                  Download Pdf
                </button>
                <div className="mx-20 mt-10  py-6 hidden " id="my-table">
                  {elem.timetable.map((ele, index) => {
                    return (
                      <div className="my-4">
                        <h1 className="bg-black text-white p-2 font-bold text-center py-4 border">
                          TimeTable For Division {index + 1}
                        </h1>
                        <table
                          className=" border-2 border-black text-center w-full"
                          id={`my-table${index}`}
                        >
                          <thead>
                            <tr className="border-2 border-black p">
                              <th className="border-2 border-black py-3">
                                Time
                              </th>
                              <th className="border-2 border-black">Monday</th>
                              <th className="border-2 border-black">Tuesday</th>
                              <th className="border-2 border-black">
                                Wednesday
                              </th>
                              <th className="border-2 border-black">
                                Thursday
                              </th>
                              <th className="border-2 border-black">Friday</th>
                              <th className="border-2 border-black">
                                Saturday
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {ele.map((ele1, index) => {
                              return (
                                <>
                                  <tr className="border-2 border-black">
                                    <td>{elem.slots[index]}</td>
                                    {ele1.map((item) => {
                                      if (item.status == 0) {
                                        return (
                                          <td className="border-2  py-3 border-black">
                                            {" "}
                                          </td>
                                        );
                                      } else if (item.lab != null) {
                                        if ((index & 1) == 1) {
                                          return;
                                        }
                                        return (
                                          <td
                                            rowSpan={2}
                                            className="border-2 bg-slate-300  py-3 border-black"
                                          >
                                            {" "}
                                            {item.lab}
                                          </td>
                                        );
                                      } else {
                                        return (
                                          <td className="border-2  py-3 border-black">
                                            {" "}
                                            <div>
                                              {item.subject} <br />{" "}
                                              {item.teacher}
                                            </div>{" "}
                                          </td>
                                        );
                                      }
                                    })}
                                  </tr>
                                  {(index == 1 || index == 3) && (
                                    <tr className="text-center">
                                      <td className="border-2  py-3 border-black"></td>
                                      <td
                                        colSpan={7}
                                        className="text-center bg-neutral-300"
                                      >
                                        {" "}
                                        Break
                                      </td>
                                    </tr>
                                  )}
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
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
