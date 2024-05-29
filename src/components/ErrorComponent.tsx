import { Link, isRouteErrorResponse } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRouteError } from "react-router-dom";
interface ErrorProps {
  status: number;
  message: string;
}
const ErrorPage = () => {
  console.log("here");
  const error: ErrorProps = useRouteError();
  console.log("error found");
  let title, message;
  if (isRouteErrorResponse(error)) {
    title = "404 Not Found";
    message = "This page does not exist.";
  } else {
    switch (error.status) {
      case 400:
        title = "400 Bad Request";
        message = "The request could not be understood by the server.";
        break;
      case 401:
        title = "401 Unauthorized";
        message = "You are not authorized to view this page.";
        break;
      case 403:
        title = "403 Forbidden";
        message = "You do not have permission to access this page.";
        break;
      case 500:
        title = "500 Internal Server Error";
        message = "An error occurred on the server.";
        break;
      default:
        title = `${error.status} Error`;
        message = error.message || "An unexpected error occurred.";
    }
  }

  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">{title}</h1>
      <p className="text-xl mb-5">{message}</p>
      {/* <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Link> */}
    </section>
  );
};

export default ErrorPage;
