import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function History() {
  const [timetables, settimetables] = useState([]);
  let { dept, year } = useParams();
  const BaseUrl = process.env.REACT_APP_BASE_URL ;


  useEffect(() => {
    getTimeTables();
  }, []);

  const getTimeTables = async () => {
    const response = await axios.post(
      `${BaseUrl}/api/timetable/get`,
      { dept, year }
    );

    settimetables(response.data);
  };
  const navigate = useNavigate();

  const goToAboutPage = (id) => {
    navigate(`/timetable/${id}`);
  };

  const handleExportPDF = (size) => {
    for(var index = 0 ; index<size  ; index++)
    {
      const doc = new jsPDF();
      doc.autoTable({ html: `#my-table${index}` });
      doc.save(`Division_${index+1}.pdf`);
    }
};

const next = ()=>{
  navigate(`/${dept}/${year}/subjects`);

}

  return (
    <div className="bg-lime-600 h-screen  overflow-y-scroll pt-24">
      <div className="mx-20">
        <h1 className=" font-extrabold text-2xl  text-zinc-800 bg-white p-1 px-10 py-2 inline rounded-full " >{year.toUpperCase()} - {dept}</h1>
        {timetables.length > 0 ?(
          timetables.map((elem, index) => {
            const ncreatedAt = new Date(elem.createdAt);

            return (
              <div className=" bg-orange-300 border-zinc-600 rounded h-32 border px-4 my-4 p-4  ">
                <h1 className=" font-bold text-2xl text-neutral-800">
                  TimeTable {index + 1}{" "}
                  <p className="my-2 text-sm float-end font-normal">
                  {ncreatedAt.toLocaleDateString()}
                  </p>
                </h1>
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => goToAboutPage(elem._id)}
                    className="bg-blue-400 py-1 my-4 w-full border-zinc-700 text-stone-800 border rounded  active:scale-90 transition-all  font-bold "
                  >
                    View Here
                  </button>
                  <button
                    onClick={()=>handleExportPDF(elem.timetable.length)}
                    className="bg-blue-400 py-1 my-4 w-full  border-zinc-700 text-stone-800 border rounded  active:scale-90 transition-all  font-bold "
                  >
                    Download PDF
                  </button>
                </div>
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
            );
          })
        ) : (
          <>
          <h3 className="mt-10 ms-10 text-sm text-center" >There are No TImeTables.  Insert Data and Then Generate Timetable.</h3>
          <button onClick={next} className="bg-blue-300 p-1 px-4 rounded-md border border-black w-full my-4 active:scale-90 transition-all" >Insert Data</button>
          </>
        )}
      </div>
    </div>
  );
}
