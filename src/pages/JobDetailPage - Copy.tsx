import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Job from "../components/Job";
import Spinner from "../components/Spinner";
const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        console.log(JSON.stringify(data, null, 0));
        setJob(data);
      } catch (error) {
        console.log("Error fetching jobs ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return loading ? <Spinner loading /> : <h1> {job.title} </h1>;
};

export default JobDetail;
