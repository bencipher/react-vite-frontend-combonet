import React from "react";
import Hero from "../components/Hero";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import HomeCards from "../components/HomeCards";

const HomePage = ({ data }) => {
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} dataGetter={data} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
