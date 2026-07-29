import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Briefcase, Building, TrendingUp, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
const ADMIN_CARDS = [
  { title: "Total Users", value: "2,543", icon: Users, color: "text-blue-600" },
  { title: "Active Jobs", value: "487", icon: Briefcase, color: "text-purple-600" },
  { title: "Companies", value: "156", icon: Building, color: "text-green-600" },
  { title: "Platform Revenue", value: "$45.2K", icon: TrendingUp, color: "text-orange-600" },
];

const PLATFORM_METRICS = [
  { month: "Jan", users: 1200, jobs: 320, revenue: 8500 },
  { month: "Feb", users: 1400, jobs: 380, revenue: 10200 },
  { month: "Mar", users: 1800, jobs: 420, revenue: 12800 },
  { month: "Apr", users: 2100, jobs: 450, revenue: 15600 },
  { month: "May", users: 2543, jobs: 487, revenue: 18200 },
];



const FLAGGED_CONTENT = [
  { id: 1, type: "Job Posting", title: "Suspicious Job Listing", company: "Unknown Corp", status: "Pending Review" },
  { id: 2, type: "User Profile", title: "Potential Spam Account", user: "user123", status: "Under Investigation" },
  { id: 3, type: "Application", title: "Fraudulent Resume", applicant: "John Smith", status: "Flagged" },
];

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [platformMetrics, setPlatformMetrics] = useState<{ month: string; users: number; jobs: number; revenue: number }[]>([]);
  const [CompanyTrends, setCompanyTrends] = useState<{ company: string; jobs: number }[]>([]);
  const [applications, setApplications] = useState<{ status: string; count: number }[]>([]);
  const [recentUsers, setRecentUsers] = useState<Array<{ id: string | number; username: string; email: string; role: string; joinedDate: string }>>([]);

useEffect(() => {
  fetch("http://https://job-portal-project-tl24.onrender.com/dashboard/total-users")
    .then((res) => res.json())
    .then((data) => {
      console.log("Total Users:", data);
      setTotalUsers(data.total_users);
    })
    .catch((err) => console.error(err));
  fetch("http://https://job-portal-project-tl24.onrender.com/jobs")
    .then((res) => res.json())
    .then((data) => {
      console.log("jobs:", data);
      setActiveJobs(data.length);
    })
    .catch((err) => console.error(err));
    fetch("http://https://job-portal-project-tl24.onrender.com/company")
    .then((res) => res.json())
    .then((data) => {
      console.log("Companies:", data);
      setCompanies(data.length);
    })
    .catch((err) => console.error(err));
    fetch("http://https://job-portal-project-tl24.onrender.com/dashboard/monthly-growth")
    .then((res) => res.json())
    .then((data) =>
    setPlatformMetrics(data))
    .catch((err) => console.error(err));
    fetch("http://https://job-portal-project-tl24.onrender.com/dashboard/company-trends")
    .then((res) => res.json())
    .then((data) =>
    setCompanyTrends(data))
    .catch((err) => console.error(err));
    fetch("http://https://job-portal-project-tl24.onrender.com/dashboard/application-status")
    .then((res) => res.json())
    .then((data) =>
    setApplications(data))
    .catch((err) => console.error(err));
    fetch("http://https://job-portal-project-tl24.onrender.com/dashboard/recent-users")
    .then((res) => res.json())
    .then((data) =>
    setRecentUsers(data))
    .catch((err) => console.error(err));
}, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Platform overview and management</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 space-y-8">
        {/* Admin Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {ADMIN_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Card key={i} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`w-8 h-8 ${card.color}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <p className="text-3xl font-bold">{card.title === "Total Users" 
                ? totalUsers 
                : card.title === "Active Jobs" 
                ? activeJobs 
                : card.title === "Companies" 
                ? companies
                : card.value}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Platform Growth */}
          <Card className="glass-card p-6">
            <h3 className="font-bold mb-4">Platform Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={platformMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Line type="monotone" dataKey="jobs" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Revenue Trend */}
          <Card className="glass-card p-6">
            <h3 className="font-bold mb-4">Company Hiring Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CompanyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="company" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Bar dataKey="jobs" fill="var(--accent)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Users & Flagged Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recent Users</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin/users")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-start justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user .username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">{user.role}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Application status */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                Application status
              </h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin/reports")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {applications.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg bg-blue-500/5 border border-blue-200/30"
                >
                  <div>
                    <p className="font-medium text-sm">{item.status}</p>
                  </div>

                  <Badge>{item.count}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Management Sections */}
        <Card className="glass-card p-6">
          <h3 className="font-bold mb-4">Management</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-12" onClick={() => navigate("/admin/users")}>
              Manage Users
            </Button>
            <Button variant="outline" className="h-12" onClick={() => navigate("/admin/companies")}>
              Manage Companies
            </Button>
            <Button variant="outline" className="h-12" onClick={() => navigate("/admin/jobs")}>
              Manage Jobs
            </Button>
            <Button variant="outline" className="h-12" onClick={() => navigate("/admin/analytics")}>
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
