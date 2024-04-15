import { useState, useEffect } from "react";
import Job from "./Job";
import Spinner from "./Spinner";
import siteDefaults from "../config/siteDefaults.json";

const JobListings = ({ isHome = false, dataGetter = null }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const responseData = await dataGetter();
        const data = isHome
          ? responseData.slice(0, siteDefaults.homepageJobCount)
          : responseData;
        // fi this to dynamically pass limit from config
        setJobs(data);
      } catch (error) {
        console.log("Error fetching jobs ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Job key={job.id} jobDetails={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
