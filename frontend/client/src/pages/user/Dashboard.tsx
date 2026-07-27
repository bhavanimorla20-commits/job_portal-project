import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Briefcase, BookmarkCheck, Calendar, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

const DASHBOARD_CARDS = [
  { title: "Total Applications", value: "12", icon: Briefcase, color: "text-blue-600" },
  { title: "Saved Jobs", value: "8", icon: BookmarkCheck, color: "text-purple-600" },
  { title: "Interview Calls", value: "3", icon: Calendar, color: "text-green-600" },
  { title: "Profile Completion", value: "85%", icon: CheckCircle, color: "text-orange-600" },
];

const APPLICATIONS_DATA = [
  { month: "Jan", applications: 2 },
  { month: "Feb", applications: 3 },
  { month: "Mar", applications: 5 },
  { month: "Apr", applications: 8 },
  { month: "May", applications: 12 },
];

const APPLICATION_STATUS = [
  { name: "Pending", value: 5, color: "#3b82f6" },
  { name: "Reviewed", value: 3, color: "#8b5cf6" },
  { name: "Shortlisted", value: 2, color: "#10b981" },
  { name: "Rejected", value: 2, color: "#ef4444" },
];

const RECENT_APPLICATIONS = [
  { id: 1, job: "Senior React Developer", company: "TechCorp", date: "2 days ago", status: "Shortlisted" },
  { id: 2, job: "Product Manager", company: "StartupXYZ", date: "5 days ago", status: "Pending" },
  { id: 3, job: "UX/UI Designer", company: "DesignStudio", date: "1 week ago", status: "Reviewed" },
];

const RECOMMENDED_JOBS = [
  { id: 1, title: "Frontend Engineer", company: "TechCorp", salary: "$120k-$160k", match: "95%" },
  { id: 2, title: "Full Stack Developer", company: "StartupXYZ", salary: "$100k-$140k", match: "88%" },
  { id: 3, title: "React Developer", company: "DesignStudio", salary: "$110k-$150k", match: "92%" },
];

export default function UserDashboard() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back! Here's your job search summary</p>
          </div>
          <Button onClick={() => navigate("/user/browse-jobs")}>
            Browse Jobs <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 space-y-8">
        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {DASHBOARD_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Card key={i} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`w-8 h-8 ${card.color}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <p className="text-3xl font-bold">{card.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Applications Per Month */}
          <Card className="glass-card p-6">
            <h3 className="font-bold mb-4">Applications Per Month</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={APPLICATIONS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Application Status */}
          <Card className="glass-card p-6">
            <h3 className="font-bold mb-4">Application Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={APPLICATION_STATUS} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {APPLICATION_STATUS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Applications & Recommended Jobs */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recent Applications</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/user/applications")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {RECENT_APPLICATIONS.map((app) => (
                <div key={app.id} className="flex items-start justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{app.job}</p>
                    <p className="text-xs text-muted-foreground">{app.company} • {app.date}</p>
                  </div>
                  <Badge variant={app.status === "Shortlisted" ? "default" : "secondary"}>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Jobs */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recommended For You</h3>
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <div className="space-y-3">
              {RECOMMENDED_JOBS.map((job) => (
                <div key={job.id} className="flex items-start justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors cursor-pointer">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                    <p className="text-xs text-accent font-medium mt-1">{job.salary}</p>
                  </div>
                  <Badge variant="outline" className="text-accent border-accent">
                    {job.match}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card p-6">
          <h3 className="font-bold mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-12" onClick={() => navigate("/user/browse-jobs")}>
              Browse Jobs
            </Button>
            <Button variant="outline" className="h-12" onClick={() => navigate("/user/profile")}>
              Update Resume
            </Button>
            <Button variant="outline" className="h-12" onClick={() => navigate("/user/profile")}>
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
