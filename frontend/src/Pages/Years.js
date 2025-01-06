import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Years() {
  const { dept } = useParams();

  return (
    <div className="pt-20">
      <h1 className=" font-bold text-xl mx-10 my-4 rounded text-white bg-stone-600 p-4">
        {dept.replace("-", " ").replace("-", " ")}
      </h1>
      <div className="flex  flex-wrap justify-center gap-8 mt-10 text-stone-800 ">
        <Link
          to="fe"
          className="shadow-slate-800 shadow-xl bg-neutral-200  h-32 px-64 rounded-lg text-center border border-neutral-600 active:scale-90 transition-all"
        >
          <h3 className=" text-2xl font-bold mt-10">First year</h3>
        </Link>
        <Link
          to="se"
          className="shadow-slate-800 shadow-xl bg-neutral-200 h-32 px-64 rounded-lg text-center border-2 border-neutral-600 active:scale-90 transition-all"
        >
          <h3 className=" text-2xl font-bold mt-10">Second year</h3>
        </Link>
        <Link
          to="te"
          className="shadow-slate-800 shadow-xl bg-neutral-200 h-32 px-64 rounded-lg text-center border-2 border-neutral-600 active:scale-90 transition-all"
        >
          <h3 className=" text-2xl font-bold mt-10">Third year</h3>
        </Link>
        <Link
          to="be"
          className="shadow-slate-800 shadow-xl bg-neutral-200 h-32 px-64 rounded-lg text-center border-2 border-neutral-600 active:scale-90 transition-all"
        >
          <h3 className=" text-2xl font-bold mt-10">Fourth year</h3>
        </Link>
      </div>
    </div>
  );
}
