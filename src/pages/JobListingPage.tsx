import React from "react";
import JobListings from "../components/JobListings";

const JobListing = ({ data }) => {
  return <JobListings dataGetter={data} />;
};

export default JobListing;
