import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import CreateTimeTable from './Pages/CreateTimeTable';
import ErrorPage from './Pages/Error';
import Division from './Pages/Division';
import Subjects from './Pages/Subjects';
import Teachers from './Pages/Teachers';
import Alltimetables from './Pages/Alltimetables';
import Years from './Pages/Years';
import Labs from "./Pages/Labs"
import History from "./Pages/History"
import TimeTable from './Pages/TimeTable';
import Elective from './Pages/Elective';
import Honors from './Pages/Honors';
const router =  createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "timetable/:id",
        element: <TimeTable />,
      },
      // {
      //   path: "about",
      //   element: <About />,
      // },
      {
        element: <Home />,
      },
      {
        path : "home" ,
        element: <Home />,
      },
      
      {
        index : true ,

        element: <CreateTimeTable />,
      },
      {
        path: "departments",

        element: <CreateTimeTable />,
      },
      {
        path : ":dept" ,
        element : <Years/> ,
       
      },
      {
        path : ":dept/:year" ,
        element : <Division/>,
        children : [
          {
            index : true ,
             element  : <History/> ,
          },
          {
            path : "previous-timetables" ,
             element  : <History/> ,
          },
          {
            path:"subjects" , 
            element : <Subjects/>
          },
          {
            path:"elective" , 
            element : <Elective/>
          },
          {
            path:"honors" , 
            element : <Honors/>
          },
          {
            path:"labs" , 
            element : <Labs/>
          },
          {
            path:"teachers" , 
            element : <Teachers/>
          },
          {
            path:"generate" , 
            element : <Alltimetables/>
          }
        ]
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);
