import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Calendar, MapPin, DollarSign } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

const APPLICATIONS = [
  { id: 1, job: "Senior React Developer", company: "TechCorp", salary: "$120k-$160k", appliedDate: "2 days ago", status: "Shortlisted", nextStep: "Interview scheduled for Jul 25" },
  { id: 2, job: "Product Manager", company: "StartupXYZ", salary: "$100k-$140k", appliedDate: "5 days ago", status: "Pending", nextStep: "Under review" },
  { id: 3, job: "UX/UI Designer", company: "DesignStudio", salary: "$80k-$120k", appliedDate: "1 week ago", status: "Reviewed", nextStep: "Waiting for feedback" },
  { id: 4, job: "Backend Engineer", company: "TechCorp", salary: "$130k-$170k", appliedDate: "1 week ago", status: "Rejected", nextStep: "Application not selected" },
  { id: 5, job: "Data Scientist", company: "FinanceHub", salary: "$110k-$150k", appliedDate: "2 weeks ago", status: "Shortlisted", nextStep: "Technical assessment pending" },
  { id: 6, job: "DevOps Engineer", company: "CloudTech", salary: "$100k-$140k", appliedDate: "2 weeks ago", status: "Pending", nextStep: "Under review" },
];

const STATUS_COLORS = {
  Shortlisted: "bg-green-500/10 text-green-700 border-green-200",
  Pending: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  Reviewed: "bg-blue-500/10 text-blue-700 border-blue-200",
  Rejected: "bg-red-500/10 text-red-700 border-red-200",
};

export default function MyApplications() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredApplications = APPLICATIONS.filter((app) => {
    if (searchQuery && !app.job.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterStatus !== "all" && app.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: APPLICATIONS.length,
    shortlisted: APPLICATIONS.filter(a => a.status === "Shortlisted").length,
    pending: APPLICATIONS.filter(a => a.status === "Pending").length,
    rejected: APPLICATIONS.filter(a => a.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4">
          <button
            onClick={() => navigate("/user/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-2xl font-bold">My Applications</h1>
            <p className="text-sm text-muted-foreground">Track your job applications and their status</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Applications</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </Card>
          <Card className="glass-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Shortlisted</p>
            <p className="text-3xl font-bold text-green-600">{stats.shortlisted}</p>
          </Card>
          <Card className="glass-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </Card>
          <Card className="glass-card p-6">
            <p className="text-sm text-muted-foreground mb-2">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <Card key={app.id} className="glass-card p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{app.job}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{app.company}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {app.salary}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Applied {app.appliedDate}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={`${STATUS_COLORS[app.status as keyof typeof STATUS_COLORS]} border`}>
                    {app.status}
                  </Badge>
                </div>

                <div className="bg-background/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Next Step:</strong> {app.nextStep}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    View Job
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Application
                  </Button>
                  {app.status === "Shortlisted" && (
                    <Button className="flex-1 btn-premium">
                      Schedule Interview
                    </Button>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="glass-card p-12 text-center">
              <p className="text-muted-foreground">No applications found matching your criteria.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
