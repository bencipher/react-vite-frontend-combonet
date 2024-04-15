import React from "react";
import JobListings from "../components/JobListings";

const JobSearchResults = ({ data }) => {
  console.log(data);
  return <JobListings />;
};

export default JobSearchResults;
