import React, { useEffect, useState } from "react";
import bin from "../Assets/bin.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Subjects() {
  const [labs, setlabs] = useState([]);
  const [lname, setlname] = useState(null);
  const [noOfLabsPerWeek, setnoOfLabsPerWeek] = useState(0);
  const BaseUrl = process.env.REACT_APP_BASE_URL ;
  
  let { dept , year } = useParams();

  useEffect(() => {
    getsubjects();
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${BaseUrl}/api/lab/insert`, {
      name: lname,
      noOfLabsPerWeek: noOfLabsPerWeek,
      noOfLabsPerWeek1: noOfLabsPerWeek,
      dept , year
    });
    console.log(response);
    getsubjects();
  };

  const getsubjects = async () => {
    const response = await axios.post(`${BaseUrl}/api/lab/get` ,{dept , year});
    setlabs(response.data);
    console.log(response);
  };

  const deleteHandle = async (name) => {
    console.log(name);
    const response = await axios.post(`${BaseUrl}/api/lab/delete`, {
      name,
      dept , year
    });
    console.log(response);
    getsubjects();
  };

  const changeHandle = (event) => {
    setlname(event.target.value);
  };
  const changeHandle1 = (event) => {
    setnoOfLabsPerWeek(event.target.value);
  };

  const navigate = useNavigate() ;

  const next = ()=>{
    navigate(`/${dept}/${year}/teachers`);
  
  }

  return (
    <div className=" h-screen bg-lime-600 py-32 overflow-y-scroll">
      <div className="flex flex-col justify-start items-center h-full">
        {labs.length>0 && <table className=" table-auto bg-slate-300  w-3/4 text-center">
          <thead className="">
            <tr>
              <th class="border border-black px-4 py-2">Sr.No</th>
              <th class="border border-black px-4 py-2">Name</th>
              <th class="border border-black  py-2 ">
                Number Of Labs Per Week
              </th>
              <th class=" border border-black px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((ele, index) => {
              return (
                <tr className=" ">
                  <td className=" text-center border-black border ">
                    {index + 1}{" "}
                  </td>
                  <td className=" border-black border"> {ele.name}</td>
                  <td className="border-black border">{ele.noOfLabsPerWeek}</td>
                  <td className="border-black border  px-4 py-2 text-center">
                    <img
                      onClick={() => deleteHandle(ele.name)}
                      className="mx-auto cursor-pointer"
                      width={20}
                      src={bin}
                      alt=""
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>}

        <div className="my-10   w-1/2   ">
          <form onSubmit={handle}>
            <div>
              <label
                className="   py-1 text-gray-800 font-bold text-lg"
                htmlFor=""
              >
                Enter Lab Name
              </label>
              <input
                type="text"
                onChange={changeHandle}
                required
                value={lname}
                className="  w-full px-2 py-1 my-2 rounded"
              />
            </div>
            <div>
              <label
                className="   py-1 text-gray-800 font-bold text-lg"
                htmlFor=""
              >
                Enter Number Of Classes Per Week
              </label>
              <input
                type="Number"
                onChange={changeHandle1}
                required
                value={noOfLabsPerWeek}
                className="  w-full px-2 py-1 my-2 rounded"
              />
            </div>

            <div className="flex gap-2" >
            <button
              type="submit"
              className="bg-blue-400 py-1 my-4 w-full  border-black border rounded  active:scale-90 transition-all"
            >
              Add
            </button>
            <button
              onClick={next}
              className="bg-blue-400 py-1 my-4 w-full  border-black border rounded  active:scale-90 transition-all"
            >
              Next
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
