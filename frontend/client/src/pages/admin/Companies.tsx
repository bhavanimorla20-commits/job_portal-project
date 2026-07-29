import { useEffect, useState } from "react";

export default function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://https://job-portal-project-tl24.onrender.com/company")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Companies</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-3 text-center w-16">ID</th>
              <th className="border px-4 py-3 text-left">Company Name</th>
              <th className="border px-4 py-3 text-left">Email</th>
              <th className="border px-4 py-3 text-center">Location</th>
              <th className="border px-4 py-3 text-left">Website</th>
              <th className="border px-4 py-3 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company: any) => (
              <tr
                key={company.id}
                className="hover:bg-gray-100 transition"
              >
                <td className="border px-4 py-3 text-center">
                  {company.id}
                </td>

                <td className="border px-4 py-3">
                  {company.name}
                </td>

                <td className="border px-4 py-3">
                  {company.email}
                </td>

                <td className="border px-4 py-3 text-center">
                  {company.location}
                </td>

                <td className="border px-4 py-3 text-blue-600">
                  {company.website}
                </td>

                <td className="border px-4 py-3">
                  {company.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}