import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Briefcase, Users, FileText, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

const DASHBOARD_CARDS = [
  { title: "Active Jobs", value: "8", icon: Briefcase, color: "text-blue-600" },
  { title: "Total Applicants", value: "156", icon: Users, color: "text-purple-600" },
  { title: "Pending Reviews", value: "23", icon: FileText, color: "text-green-600" },
  { title: "Hired This Month", value: "4", icon: TrendingUp, color: "text-orange-600" },
];

const HIRING_TREND = [
  { month: "Jan", applications: 45 },
  { month: "Feb", applications: 52 },
  { month: "Mar", applications: 68 },
  { month: "Apr", applications: 89 },
  { month: "May", applications: 156 },
];

const APPLICANT_STATUS = [
  { name: "New", value: 45, color: "#3b82f6" },
  { name: "Screening", value: 38, color: "#8b5cf6" },
  { name: "Interview", value: 42, color: "#10b981" },
  { name: "Offered", value: 31, color: "#f59e0b" },
];

const RECENT_JOBS = [
  { id: 1, title: "Senior React Developer", applicants: 45, status: "Active" },
  { id: 2, title: "Product Manager", applicants: 32, status: "Active" },
  { id: 3, title: "UX/UI Designer", applicants: 28, status: "Active" },
];

const RECENT_APPLICANTS = [
  { id: 1, name: "Sarah Johnson", job: "Senior React Developer", appliedDate: "Today", status: "New" },
  { id: 2, name: "Mike Chen", job: "Product Manager", appliedDate: "Yesterday", status: "Screening" },
  { id: 3, name: "Emma Davis", job: "UX/UI Designer", appliedDate: "2 days ago", status: "Interview" },
];

export default function RecruiterDashboard() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your job postings and applicants</p>
          </div>
          <Button className="btn-premium" onClick={() => navigate("/recruiter/post-job")}>
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
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
          {/* Hiring Trend */}
          <Card className="glass-card p-6">
            <h3 className="font-bold mb-4">Hiring Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={HIRING_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Applicant Status Distribution */}
          <Card className="glass-card p-6">
            <h3 className="font-bold mb-4">Applicant Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={APPLICANT_STATUS} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {APPLICANT_STATUS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Jobs & Applicants */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recent Job Postings</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/recruiter/manage-jobs")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {RECENT_JOBS.map((job) => (
                <div key={job.id} className="flex items-start justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.applicants} applicants</p>
                  </div>
                  <Badge variant="secondary">{job.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Applicants */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recent Applicants</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/recruiter/applicants")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {RECENT_APPLICANTS.map((applicant) => (
                <div key={applicant.id} className="flex items-start justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors cursor-pointer">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{applicant.name}</p>
                    <p className="text-xs text-muted-foreground">{applicant.job}</p>
                    <p className="text-xs text-muted-foreground mt-1">{applicant.appliedDate}</p>
                  </div>
                  <Badge variant="outline" className="text-accent border-accent">
                    {applicant.status}
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
            <Button variant="outline" className="h-12" onClick={() => navigate("/recruiter/post-job")}>
              Post New Job
            </Button>
            <Button variant="outline" className="h-12" onClick={() => navigate("/recruiter/applicants")}>
              Review Applicants
            </Button>
            <Button variant="outline" className="h-12" onClick={() => navigate("/recruiter/company-profile")}>
              Edit Company Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
