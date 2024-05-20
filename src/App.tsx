import React from "react";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobListing from "./pages/JobListingPage";
import JobDetailPage, { jobLoader } from "./pages/JobDetailPage";
import BaseLayout from "./layouts/BaseLayout";
import AddNewJob from "./pages/AddNewJobPage";
import NotFound from "./pages/NotFound";
import EditJob from "./pages/EditJobPage";
import JobSearchResults from "./pages/JobSearchPage";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/auth/ProtectedRouter";
import Callback from "./pages/Callback";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";

const App = () => {
  console.log("in here");
  console.log(import.meta.env.VITE_AUTH0_DOMAIN);
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
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return;
  };

  // Update Job
  const searchJob = async (filters: {
    type: string;
    location: string;
    title: string;
  }) => {
    console.log(filters);

    try {
      const url = `/api/jobs/search?${buildQueryParameters(filters)}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error searching jobs ", error);
    }
  };

  const fetchJobs = async () => {
    const apiUrl = "api/jobs";
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error fetching jobs ", error);
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
    <Routes>
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
        <Route path="callback" element={<Callback />} />
        <Route
          path="jobs/search"
          element={<JobSearchResults data={fetchJobs} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/jobs/:id"
          element={<JobDetailPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
      </Route>
    </Routes>
  );

  // const router = createBrowserRouter(createRoutesFromElements(RoutesJSX));
  // return <RouterProvider router={router} />;
  return RoutesJSX;

  // Utility function to convert an object into query parameters

  {
    /* <Route
        path="jobs/:id"
        element={
          <ProtectedRoute element={<JobDetailPage deleteJob={deleteJob} />} />
        }
        loader={jobLoader}
      /> */
  }
  {
    /* <Route
        path="add-job"
        element={
          <ProtectedRoute
            element={
              <ProtectedRoute
                element={AddNewJob}
                addJobSubmit={saveJobHandler}
              />
            }
          />
        }
      /> */
  }

  {
    /* <Route
        path="/jobs/edit/:id"
        element={
          <ProtectedRoute element={<EditJob updateJobSubmit={updateJob} />} />
        }
        loader={jobLoader}
      /> */
  }

  // return (
  //   <Routes>
  //     <Route
  //       path="/"
  //       element={
  //         <BaseLayout
  //           currentUser={user}
  //           searchHandler={searchJob}
  //           login={loginFxn}
  //           logout={logoutFxn}
  //         />
  //       }
  //     >
  //       <Route index element={<HomePage data={fetchJobs} />} />
  //       <Route path="jobs" element={<JobListing data={fetchJobs} />} />
  //       <Route path="callback" element={<Callback />} />
  //       <Route
  //         path="jobs/search"
  //         element={<JobSearchResults data={fetchJobs} />}
  //       />
  //       <Route path="*" element={<NotFound />} />
  //       <Route
  //         path="/jobs/:id"
  //         element={<JobDetailPage deleteJob={deleteJob} />}
  //         loader={jobLoader}
  //       />
  //       <Route
  //         path="jobs/:id"
  //         element={
  //           <ProtectedRoute element={<JobDetailPage deleteJob={deleteJob} />} />
  //         }
  //         loader={jobLoader}
  //       />
  //       <Route
  //         path="add-job"
  //         element={
  //           <ProtectedRoute
  //             element={
  //               <ProtectedRoute
  //                 element={AddNewJob}
  //                 addJobSubmit={saveJobHandler}
  //               />
  //             }
  //           />
  //         }
  //       />

  //       <Route
  //         path="/jobs/edit/:id"
  //         element={
  //           <ProtectedRoute element={<EditJob updateJobSubmit={updateJob} />} />
  //         }
  //         loader={jobLoader}
  //       />
  //     </Route>
  //   </Routes>
  // );
};


export default App;
