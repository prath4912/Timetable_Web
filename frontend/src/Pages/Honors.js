import React, { useEffect, useState } from "react";
import bin from "../Assets/bin.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Honors() {
  const [teachers, setteachers] = useState([]);
  const [sname, setsname] = useState(null);
  const [tname, settname] = useState(null);
  let { dept , year } = useParams();
  const BaseUrl = process.env.REACT_APP_BASE_URL ;



  useEffect(() => {
    getsubjects();
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${BaseUrl}/api/honors/insert`,
      { name: sname, teacher : tname , dept , year   }
    );
    console.log(response);
    getsubjects();
  };

  const getsubjects = async () => {
    const response = await axios.post(`${BaseUrl}/api/honors/get` , {dept , year});
    setteachers(response.data);
    console.log(response);
  };

  const deleteHandle = async (name) => {
    console.log(name);
    const response = await axios.post(
      `${BaseUrl}/api/honors/delete`,
      { name  ,dept , year}
    );
    console.log(response);
    getsubjects();
  };

  const changeHandle = (event) => {
    setsname(event.target.value);
  };

  const changeHandle1 = (event) => {
    settname(event.target.value);
  };

  const navigate = useNavigate() ;

  const next = ()=>{
    navigate(`/${dept}/${year}/labs`);
  
  }

  return (
    <div className="h-screen bg-lime-600 pt-32 overflow-y-scroll">
      <div className="  flex flex-col justify-start items-center  ">
        {teachers.length > 0 && (
          <table className=" table-auto bg-slate-300  w-3/4 text-center">
            <thead className="">
              <tr>
                <th class="border border-black px-4 py-2">Sr.No</th>
                <th class="border border-black px-4 py-2">Name</th>
                <th class="border border-black  py-2 ">
                  Teacher
                </th>
                <th class=" border border-black px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((ele, index) => {
                return (
                  <tr className=" ">
                    <td className=" text-center border-black border ">
                      {index + 1}{" "}
                    </td>
                    <td className=" border-black border"> {ele.name}</td>
                    <td className="border-black border">
                      {ele.teacher}
                    </td>
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
          </table>
        )}

        <div className="my-10  w-1/2   ">
          <form className="" onSubmit={handle}>
            <div className="my-2 w-full">
              <label
                className=" py-1 text-gray-800 font-bold text-lg"
                htmlFor=""
              >
                Enter Honors Subject Name
              </label>
              <br />
              <input
                type="text"
                onChange={changeHandle}
                required
                value={sname}
                className=" w-full px-2 py-1 my-2 rounded"
              />
            </div>
            <div>
              <label className="py-1 text-gray-800 font-bold text-lg" htmlFor="">
                Enter Teacher Name
              </label>
              <input
                type="text"
                onChange={changeHandle1}
                required
                value={tname}
                className=" w-full px-2 py-1 my-2 rounded"
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
