import { useState, useEffect } from "react";
import Job, { JobType } from "./Job";
import Spinner from "./Spinner";
import siteDefaults from "../config/siteDefaults.json";
import { useErrorBoundary } from "react-error-boundary";
import Pagination from "./Pagination";

interface JobListingsProps {
  isHome?: boolean;
  dataGetter: () => Promise<JobType[]>;
}

const JobListings = ({ isHome = false, dataGetter }: JobListingsProps) => {
  console.log(isHome, dataGetter);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const responseData = await dataGetter();
        setJobs(responseData);
      } catch (error) {
        console.log("Error fetching jobs ", error);
        showBoundary(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [dataGetter, showBoundary]);

  const lastPostIndex = currentPage * siteDefaults.jobsPerPage;
  const firstPostIndex = lastPostIndex - siteDefaults.jobsPerPage;
  const data = isHome
    ? jobs.slice(0, siteDefaults.homepageJobCount)
    : jobs.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.map((job) => (
                <Job key={job.id} jobDetails={job} />
              ))}
            </div>
          )}
        </div>
        {!isHome && (
          <Pagination
            setCurrentPage={setCurrentPage}
            totalPosts={jobs.length}
            postsPerPage={siteDefaults.jobsPerPage}
            currentPage={currentPage}
          />
        )}
      </section>
    </>
  );
};

export default JobListings;
