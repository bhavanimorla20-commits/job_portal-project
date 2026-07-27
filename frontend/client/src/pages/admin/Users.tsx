import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard/recent-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>

        <input
          type="text"
          placeholder="Search User..."
          className="border rounded-lg px-4 py-2 w-72"
        />
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left px-5 py-3 w-20">ID</th>
              <th className="text-left px-5 py-3">Username</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-center px-5 py-3 w-32">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-5 py-3">{user.id}</td>

                <td className="px-5 py-3 font-medium">
                  {user.username}
                </td>

                <td className="px-5 py-3 text-gray-600">
                  {user.email}
                </td>

                <td className="px-5 py-3 text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}