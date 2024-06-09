import { createContext } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
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
import { AuthHandlerProvider } from "./contexts/AuthHandlerContext";

const App = () => {
  const buildQueryParameters = (
    filters: Record<string, string | undefined>
  ) => {
    const queryString = new URLSearchParams();

    for (const key in filters) {
      if (filters[key]) {
        queryString.append(key, filters[key] as string);
      }
    }

    return queryString.toString();
  };

  const saveJobHandler = async (newJob: any) => {
    const res = await axiosInstance.post("/jobs", newJob);
    return res.data;
  };

  const deleteJob = async (id: string) => {
    const res = await axiosInstance.delete(`/jobs/${id}`);
    return res.data;
  };

  const updateJob = async (job: any) => {
    const res = await axiosInstance.put(`/jobs/${job.id}`, job);
    return res.data;
  };

  const searchJob = async (filters: Record<string, string | undefined>) => {
    console.log(filters);
    const url = `/jobs/search?${buildQueryParameters(filters)}`;
    const res = await axiosInstance.get(url);
    return res.data;
  };

  const fetchJobs = async () => {
    const res = await axiosInstance.get("/jobs");
    return res.data;
  };

  const { user, loginWithRedirect, logout } = useAuth0();
  const loginFxn = async () => {
    console.log("in main log in");
    loginWithRedirect();
  };

  const logoutFxn = () => {
    console.log("called from the profile nav");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const Root = () => (
    <ErrorHandler>
      <Outlet />
    </ErrorHandler>
  );

  const RoutesJSX = (
    <Route path="/" element={<Root />}>
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
        <Route path="*" element={<NotFoundPage />} />
        <Route path="jobs" element={<JobListing data={fetchJobs} />} />
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
    </Route>
  );

  const router = createBrowserRouter(createRoutesFromElements(RoutesJSX));
  return (
    <AuthHandlerProvider>
      <RouterProvider router={router} />
    </AuthHandlerProvider>
  );
  // return <RouterProvider router={router} />;
};

// (<AuthHandlerProvider.Provider value={login: loginFxn, logout: logoutFxn}>
//   //    </AuthHandlerProvider.Provider>);

export default App;
