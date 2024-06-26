import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

export type JobType = {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: CompanyType;
};

interface CompanyType {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

const Job = ({ jobDetails }: { jobDetails: JobType }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  let description = jobDetails.description;

  if (!showFullDesc) {
    description = description.substring(0, 90) + "...";
  }
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{jobDetails.type}</div>
          <h3 className="text-xl font-bold">{jobDetails.title}</h3>
        </div>

        <div className="mb-5">{description}</div>
        <button
          onClick={() => setShowFullDesc((prevState) => !prevState)}
          className="text-indigo-600 mb-5 hover:text-indigo-600"
        >
          {showFullDesc ? "less" : "more"}
        </button>
        <h3 className="text-indigo-500 mb-2">{jobDetails.salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {jobDetails.location}
          </div>
          <Link
            to={`/jobs/${jobDetails.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Job;
