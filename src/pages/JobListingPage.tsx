import JobListings from "../components/JobListings";

const JobListing = ({ data }: any) => {
  return <JobListings dataGetter={data} />;
};

export default JobListing;
