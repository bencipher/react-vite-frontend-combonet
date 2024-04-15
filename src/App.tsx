import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobListing from "./pages/JobListingPage";
import JobDetail, { jobLoader } from "./pages/JobDetailPage";
import BaseLayout from "./layouts/BaseLayout";
import AddNewJob from "./pages/AddNewJobPage";
import NotFound from "./pages/NotFound";
import EditJob from "./pages/EditJobPage";
import JobSearchResults from "./pages/JobSearchPage";
import NextTopLoader from "nextjs-toploader";

const App = () => {
  // Utility function to convert an object into query parameters
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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout searchHandler={searchJob} />}>
        <Route index element={<HomePage data={fetchJobs} />} />
        <Route path="jobs" element={<JobListing data={fetchJobs} />} />
        <Route
          path="jobs/search"
          element={<JobSearchResults data={fetchJobs} />}
        />
        <Route
          path="jobs/:id"
          element={<JobDetail deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="add-job"
          element={<AddNewJob addJobSubmit={saveJobHandler} />}
        />
        <Route
          path="/jobs/edit/:id"
          element={<EditJob updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  console.log(router);
  return <RouterProvider router={router} />;
};

export default App;
