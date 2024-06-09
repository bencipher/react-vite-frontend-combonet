import Card from "./Card";

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold">For Applicants</h2>
            <p className="mt-2 mb-4">
              Browse our AI filtered jobs tailored for you and start your career
              today
            </p>
            <a
              href="/jobs"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              View All Jobs
            </a>
          </Card>
          <Card extraStyle="bg-indigo-100">
            <h2 className="text-2xl font-bold">For Recruiters</h2>
            <p className="mt-2 mb-4">
              List your job opportunities to find the perfect professional for
              the role
            </p>
            <a
              href="/add-job"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Add New Job
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
