import React from "react";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Division() {
  

  return (
    <div className=" bg-gray-400 flex ">
      <div className=" min-h-screen  w-1/4 bg-slate-200 py-20 flex justify-center ">
        <ul className=" flex flex-col justify-center text-center items-center  w-full ">
        <NavLink
            to={"previous-timetables"}
            className={`font-bold text-2xl active:scale-90 cursor-pointer transition-all border-b  border-black w-full py-3 `}
          >
            All TImeTables
          </NavLink>
          <NavLink
            to={"subjects"}
            className={`font-bold text-2xl active:scale-90 cursor-pointer transition-all border-b  border-black w-full py-3  `}
          >
            Subjects
          </NavLink>
          <NavLink
            to={"elective"}
            className={`font-bold text-2xl active:scale-90 cursor-pointer transition-all border-b  border-black w-full py-3  `}
          >
            Elective
          </NavLink>
          <NavLink
            to={"honors"}
            className={`font-bold text-2xl active:scale-90 cursor-pointer transition-all border-b  border-black w-full py-3  `}
          >
            Honors
          </NavLink>
          <NavLink
            to={"labs"}
            className={`font-bold text-2xl active:scale-90 cursor-pointer transition-all border-b  border-black w-full py-3 `}
          >
            Labs
          </NavLink>

          <NavLink
            to={"teachers"}
            className={`font-bold text-2xl active:scale-90 cursor-pointer transition-all border-b  border-black w-full py-3 `}
          >
            Teachers
          </NavLink>
         
          <NavLink
            to="generate"
            className=" font-bold text-2xl active:scale-90 cursor-pointer transition-all border-b  border-black w-full py-3  "
          >
            Generate TimeTable
          </NavLink>
        </ul>
      </div>
      <div className="w-full h-screen">
        <Outlet />
      </div>
    </div>
  );
}
