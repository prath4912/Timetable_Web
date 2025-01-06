import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex justify-center items-center h-screen" >
      <div>
        <h1 className="font-extrabold text-xl" >Oops!</h1>
        <p className="font-bold" >Sorry, This Page is Not available, Please go back.</p>
        <p className="text-sm" >
        Error Message : <i  >{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}