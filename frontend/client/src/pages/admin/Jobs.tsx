import { useEffect, useState } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://https://job-portal-project-tl24.onrender.com/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Jobs</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-3 text-center">ID</th>
              <th className="border px-4 py-3 text-left">Job Title</th>
              <th className="border px-4 py-3 text-left">Company</th>
              <th className="border px-4 py-3 text-center">Location</th>
              <th className="border px-4 py-3 text-center">Salary</th>
              <th className="border px-4 py-3 text-center">Created At</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job: any) => (
              <tr key={job.id} className="hover:bg-gray-100 transition">
                <td className="border px-4 py-3 text-center">{job.id}</td>
                <td className="border px-4 py-3">{job.title}</td>
                <td className="border px-4 py-3">{job.company}</td>
                <td className="border px-4 py-3 text-center">{job.location}</td>
                <td className="border px-4 py-3 text-center">₹{job.salary}</td>
                <td className="border px-4 py-3 text-center">
                  {new Date(job.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}