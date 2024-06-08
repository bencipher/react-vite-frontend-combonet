import JobListings from "../components/JobListings";

const JobSearchResults = ({ data }: any) => {
  return <JobListings dataGetter={data} />;
};

export default JobSearchResults;
