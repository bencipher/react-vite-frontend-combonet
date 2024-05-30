import { Link, isRouteErrorResponse } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRouteError } from "react-router-dom";
interface ErrorProps {
  status: number;
  statusText: string;
}
const ErrorHandler = () => {
  const error: ErrorProps = useRouteError();
  let title, message;
  if (isRouteErrorResponse(error)) {
    title = "404 Not Found";
    message = "This page does not exist.";
  } else {
    switch (error.status) {
      case 400:
        title = "400 Bad Request";
        message =
          error.statusText ||
          "The request could not be understood by the server.";
        break;
      case 401:
        title = "401 Unauthorized";
        message =
          error.statusText || "You are not authorized to view this page.";
        break;
      case 403:
        title = "403 Forbidden";
        message =
          error.statusText || "You do not have permission to access this page.";
        break;
      case 500:
        title = "500 Internal Server Error";
        message = error.statusText || "An error occurred on the server.";
        break;
      default:
        console.log("got here");
        title = `${error.status} Error`;
        message = error.statusText || "An unexpected error occurred.";
    }
  }

  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">{title}</h1>
      <p className="text-xl mb-5">{message}</p>
      <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Link>
    </section>
  );
};

export default ErrorHandler;
