import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export default function Analytics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [monthlyGrowth, setMonthlyGrowth] = useState([]);
  const [companyTrends, setCompanyTrends] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard/total-users")
      .then((res) => res.json())
      .then((data) => setTotalUsers(data.total_users))
      .catch(console.error);

    fetch("http://127.0.0.1:8000/dashboard/monthly-growth")
      .then((res) => res.json())
      .then((data) => setMonthlyGrowth(data))
      .catch(console.error);

    fetch("http://127.0.0.1:8000/dashboard/company-trends")
      .then((res) => res.json())
      .then((data) => setCompanyTrends(data))
      .catch(console.error);

    fetch("http://127.0.0.1:8000/dashboard/application-status")
      .then((res) => res.json())
      .then((data) => setApplicationStatus(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        📊 Analytics Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-4">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-4xl font-bold mt-2">{totalUsers}</p>
        </div>

        <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold">
            Monthly Growth
          </h2>
          <p className="text-2xl font-bold mt-2">
            {monthlyGrowth.length} Months
          </p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold">
            Companies
          </h2>
          <p className="text-2xl font-bold mt-2">
            {companyTrends.length}
          </p>
        </div>
      </div>
            {/* Monthly Growth Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          📈 Monthly Growth
        </h2>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="jobs"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Company Hiring Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          🏢 Company Hiring Trends
        </h2>

        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={companyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="company" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="jobs"
              fill="#16A34A"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Application Status */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          📌 Application Status
        </h2>

        <ResponsiveContainer width="350%" height={250}>
          <PieChart>
            <Pie
              data={applicationStatus}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {applicationStatus.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        Admin Dashboard Analytics
      </div>
    </div>
  );
}