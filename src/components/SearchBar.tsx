import React, { useState } from "react";
import Card from "./Card";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchFunction }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Remote");
  const [location, setLocation] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    const filterParams = {
      title,
      type,
      location,
    };
    searchFunction(filterParams);
  };
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <form onSubmit={submitForm}>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 p-4 rounded-lg">
            <div className="mb-4 lg:ml-16 md:ml-12">
              <label className="block text-gray-700 font-bold mb-2">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Data Analyst in Uk"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. USA or South Africa or Lagos"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="block w-full mb-4 mt-6 ml-5">
              <div className="flex items-center">
                <div className=" bg-black text-white rounded-lg px-2 py-2 hover:bg-gray-700">
                  <button
                    className="text-xl ml-2 inline-block justify-center"
                    type="submit"
                  >
                    Find Job
                  </button>
                  <FaSearch className="text-2xl inline-block ml-2 mr-2" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
