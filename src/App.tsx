import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobListing from "./pages/JobListingPage";
import JobDetailPage, { jobLoader } from "./pages/JobDetailPage";
import BaseLayout from "./layouts/BaseLayout";
import AddNewJob from "./pages/AddNewJobPage";
import EditJob from "./pages/EditJobPage";
import JobSearchResults from "./pages/JobSearchPage";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/auth/ProtectedRouter";
import Callback from "./pages/Callback";
import axiosInstance from "./utils/axios";
import ErrorHandler from "./components/ErrorComponent";

const App = () => {
  const buildQueryParameters = (
    filters: Record<string, string | undefined>
  ) => {
    const queryString = new URLSearchParams();

    for (const key in filters) {
      if (filters[key]) {
        queryString.append(key, filters[key]);
      }
    }

    return queryString.toString();
  };

  const saveJobHandler = async (newJob) => {
    try {
      const res = await axiosInstance.post("/jobs", newJob);
      return res.data;
    } catch (error) {
      throw new Response(error.response?.data?.message || error.message, {
        status: error.response?.status || 500,
      });
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await axiosInstance.delete(`/jobs/${id}`);
      return res.data;
    } catch (error) {
      throw new Response(error.response?.data?.message || error.message, {
        status: error.response?.status || 500,
      });
    }
  };

  const updateJob = async (job) => {
    try {
      const res = await axiosInstance.put(`/jobs/${job.id}`, job);
      return res.data;
    } catch (error) {
      throw new Response(error.response?.data?.message || error.message, {
        status: error.response?.status || 500,
      });
    }
  };

  const searchJob = async (filters) => {
    console.log(filters);
    try {
      const url = `/jobs/search?${buildQueryParameters(filters)}`;
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (error) {
      throw new Response(error.response?.data?.message || error.message, {
        status: error.response?.status || 500,
      });
    }
  };

  const fetchJobs = async () => {
    try {
      console.log("here");
      const res = await axiosInstance.get("/jobs");
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("Got Error in Loader: ", JSON.stringify(error, null, 2));
      throw new Response("", {
        statusText: "Could not load jobs at all",
        status: error.response?.status || 500,
      });
    }
  };

  const { user, loginWithRedirect, logout } = useAuth0();
  console.log("user is ", JSON.stringify(user, null, 2));
  const loginFxn = async () => {
    loginWithRedirect();
  };

  const logoutFxn = () => {
    console.log("is logout working");
    console.log(window.location.origin);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const RoutesJSX = (
    <Route
      path="/"
      element={
        <BaseLayout
          currentUser={user}
          searchHandler={searchJob}
          login={loginFxn}
          logout={logoutFxn}
        />
      }
      errorElement={<ErrorHandler />}
    >
      <Route index element={<HomePage data={fetchJobs} />} />
      <Route
        path="jobs"
        element={<JobListing data={fetchJobs} />}
        errorElement={<ErrorHandler />}
      />
      <Route
        path="jobs/search"
        element={<JobSearchResults data={fetchJobs} />}
      />
      <Route path="callback" element={<Callback />} />
      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute element={JobDetailPage} deleteJob={deleteJob} />
        }
        loader={jobLoader}
      />
      <Route
        path="add-job"
        element={
          <ProtectedRoute element={AddNewJob} addJobSubmit={saveJobHandler} />
        }
      />

      <Route
        path="/jobs/edit/:id"
        element={
          <ProtectedRoute element={EditJob} updateJobSubmit={updateJob} />
        }
        loader={jobLoader}
      />
    </Route>
  );

  const router = createBrowserRouter(createRoutesFromElements(RoutesJSX));
  return <RouterProvider router={router} />;
};

export default App;
