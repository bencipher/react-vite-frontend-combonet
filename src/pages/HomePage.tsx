import Hero from "../components/Hero";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import HomeCards from "../components/HomeCards";

const HomePage = ({ data }: any) => {
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
