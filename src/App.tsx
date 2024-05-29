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
import { handleAxiosError } from "./errors/axioxErrorHandler";
import { useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import { ErrorProvider } from "./errors/ErrorContext";
import ErrorBoundary from "./errors/ErrorBoundary";

const App = () => {
  const [error, setError] = useState<{ code: number; message: string } | null>(
    null
  );
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

  const saveJobHandler = async (newJob: any) => {
    try {
      const res = await axiosInstance.post("/jobs", newJob);
      return res.data;
    } catch (error) {
      setError({ code: error.response?.status, message: error.message });
      throw error;
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/jobs/${id}`);
      return res.data;
    } catch (error) {
      setError({ code: error.response?.status, message: error.message });
      throw error;
    }
  };

  const updateJob = async (job: any) => {
    try {
      const res = await axiosInstance.put(`/jobs/${job.id}`, job);
      return res.data;
    } catch (error) {
      setError({ code: error.response?.status, message: error.message });
      throw error;
    }
  };

  const searchJob = async (filters: {
    type: string;
    location: string;
    title: string;
  }) => {
    console.log(filters);
    try {
      const url = `/jobs/search?${buildQueryParameters(filters)}`;
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (error) {
      setError({ code: error.response?.status, message: error.message });
      throw error;
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/jobs");
      return res.data;
    } catch (error) {
      setError({ code: error.response?.status, message: error.message });
      throw error;
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

  if (error) {
    return <ErrorPage errorCode={error.code} errorMessage={error.message} />;
  }

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
    >
      <Route index element={<HomePage data={fetchJobs} />} />
      <Route path="jobs" element={<JobListing data={fetchJobs} />} />
      <Route
        path="jobs/search"
        element={<JobSearchResults data={fetchJobs} />}
      />
      <Route path="callback" element={<Callback />} />
      <Route
        path="*"
        element={
          <ErrorPage
            errorCode={404}
            errorMessage="Page Not Found or Does Not Exists"
          />
        }
      />
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
  return (
    <ErrorProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ErrorProvider>
  );
};

export default App;
