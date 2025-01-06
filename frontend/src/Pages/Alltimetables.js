import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Alltimetables() {

  const BaseUrl = process.env.REACT_APP_BASE_URL ;
  const [subjects, setsubjects] = useState([]);
  const [nodiv, setnodiv] = useState(0);
  const [timetables, settimetables] = useState([]);
  const [arr, setarr] = useState([]);
  const [rules, setRules] = useState([""]);
  const[slots , setslots] = useState([]) ;

  let { dept , year } = useParams();

  useEffect(() => {
    getsubjects();
  }, []);

  const changehandle = (event) => {
    setnodiv(event.target.value);
  };

  const getsubjects = async () => {
    const response = await axios.post(`${BaseUrl}/api/subject/get`, {dept , year});
    setsubjects(response.data);
  };

  const handle = async (e) => {
    e.preventDefault();
    console.log("insubmit");
    console.log(arr);
    const res = await axios.post(
      `${BaseUrl}/api/timetable/generate`,
      { nodiv: nodiv, arr , rules ,dept , year }
    );
    setslots(res.data.slots) ;
    settimetables(res.data.timetable);
  };

  const handleSave = () => {
    const arr1 = [];
    for (var i = 0; i < nodiv; i++) {
      arr1[i] = {};
      subjects.forEach((ele)=>{
        arr1[i][ele.name] = " " ;
      })
    }
    setarr(arr1);
  };
 


  const handleselect = (e, name, index) => {
    arr[index][name] = e.target.value;
  };


  const addfield1 = (e) => {
    e.preventDefault();
    setRules([...rules, ""]);
  };

  const handleFormChange1 = (index, event) => {
    const { value } = event.target;
    const data = [...rules];
    data[index] = value;
    setRules(data);
  };

  const handleRemove1 = (event, index) => {
    event.preventDefault();
    if (index == 0) {
      return;
    }
    let data = [...rules];
    data.splice(index, 1);
    setRules(data);
  };


  return (
    <div className="pt-20 bg-lime-600 h-screen overflow-y-scroll">
      <div className=" mx-20">
        <form onSubmit={handle}>
          <div>
          <label
              className="   py-1 text-gray-800 font-bold text-lg"
              htmlFor=""
            >
              Enter Slots Details
            </label>
            <div className="mt-4">
           
            {rules.map((ele, index) => {
              return (
                <div className="flex gap-2 mt-1">
                  <p>{index + 1}. </p>
                  <input
                    className="w-full border-gray-400 border rounded p-1"
                    type="text"
                    onChange={(event) => {
                      handleFormChange1(index, event);
                    }}
                    placeholder="8:45-9:45"
                    value={ele}
                    name="rules"
                    id="rules"
                  />
                  <button
                    onClick={(event) => {
                      handleRemove1(event, index);
                    }}
                    className={` border px-2 rounded active:scale-90 border-gray-400`}
                  >
                    -
                  </button>
                </div>
              );
            })}
            <div className="text-center mt-2">
              <button
                onClick={addfield1}
                className="bg-blue-400 py-1 my-4 w-full  border-black border rounded  active:scale-90 transition-all"
                >
              Add More
              </button>
            </div>
          </div>
          </div>
          {/* <div>
            <label
              className="   py-1 text-gray-800 font-bold text-lg"
              htmlFor=""
            >
              Enter Number Of Classes Per Week For Honors
            </label>
            <br />
            <input
              className=" w-full px-2 py-1 my-2 rounded"
              type="number"
              onChange={changehandle}
              value={nodiv}
            />
            */}
          {/* </div> */}
          {/* <div>
            <label
              className="   py-1 text-gray-800 font-bold text-lg"
              htmlFor=""
            >
              Enter Number Of Classes Per Week For Elective
            </label>
            <br />
            <input
              className=" w-full px-2 py-1 my-2 rounded"
              type="number"
              onChange={changehandle}
              value={nodiv}
            />
           
          </div> */}
          <div>
            <label
              className="   py-1 text-gray-800 font-bold text-lg"
              htmlFor=""
            >
              Enter Number Of Divisions
            </label>
            <br />
            <input
              className=" w-full px-2 py-1 my-2 rounded"
              type="number"
              onChange={changehandle}
              value={nodiv}
            />
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-400 py-1 my-4 w-full  border-black border rounded  active:scale-90 transition-all"
            >
              Save
            </button>
          </div>

          { arr.length>0  && <div className=" bg-amber-300 rounded flex flex-wrap justify-evenly p-3 gap-8">
            { arr.map((ele, index) => {
              return (
                <div className=" bg-orange-300 border border-zinc-500 p-4 w-96 ">
                  <h1 className=" font-extrabold text-lg" >Select Teachers For Div {index + 1}</h1>
                  {subjects.map((ele) => {
                    return (
                      <div className="my-3" >
                        <li>{ele.name}</li>
                        <select
                          className=" rounded p-0.5 w-3/4 mt-1.5 text-center"
                          onChange={(e) => handleselect(e, ele.name, index)}
                          name=""
                          id=""
                        >
                          <option value="">Select Teacher</option>
                          {ele.teachers.map((item) => {
                            return <option  >{item}</option>;
                          })}
                        </select>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>}

          <button
            type="submit"
            className="bg-blue-500 border-2 p-4  rounded-md active:scale-90 transition-all my-6 text-white font-extrabold text-xl"
          >
            Generate Timetable
          </button>
        </form>
      </div>
      <div className="mx-5 py-6" >
      {timetables.map((ele, index) => {
          return (
            <div className="my-4" >
              <h1 className="bg-black text-white p-2 font-bold text-center py-4 border" >TimeTable For Division {index + 1}</h1>
              <table  className=" border-2 border-black text-center w-full bg-slate-400" id={`my-table${index}`}>
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
                              <td rowSpan={2} className="border-2 bg-slate-100  py-3 border-black">
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
                         (index==1 || index==3) && <tr className='text-center' ><td className="border-2  py-3 border-black"></td><td colSpan={7}  className='text-center bg-neutral-100' >  Break</td></tr>
                        
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
  );
}
