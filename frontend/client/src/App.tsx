import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/Dashboard";
import BrowseJobs from "./pages/user/BrowseJobs";
import JobDetails from "./pages/user/JobDetails";
import ApplyJob from "./pages/user/ApplyJob";
import MyApplications from "./pages/user/MyApplications";
import UserProfile from "./pages/user/Profile";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import CompanyProfile from "./pages/recruiter/CompanyProfile";
import PostJob from "./pages/recruiter/PostJob";
import ManageJobs from "./pages/recruiter/ManageJobs";
import EditJob from "./pages/recruiter/EditJob";
import Applicants from "./pages/recruiter/Applicants";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminCompanies from "./pages/admin/Companies";
import AdminJobs from "./pages/admin/Jobs";
import AdminApplicants from "./pages/admin/Applicants";
import AdminReports from "./pages/admin/Reports";
import AdminAnalytics from "./pages/admin/Analytics";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />

      {/* User Routes */}
      <Route path={"/user/dashboard"} component={UserDashboard} />
      <Route path={"/user/browse-jobs"} component={BrowseJobs} />
      <Route path={"/user/job/:id"} component={JobDetails} />
      <Route path={"/user/apply/:id"} component={ApplyJob} />
      <Route path={"/user/applications"} component={MyApplications} />
      <Route path={"/user/profile"} component={UserProfile} />

      {/* Recruiter Routes */}
      <Route path={"/recruiter/dashboard"} component={RecruiterDashboard} />
      <Route path={"/recruiter/company"} component={CompanyProfile} />
      <Route path={"/recruiter/post-job"} component={PostJob} />
      <Route path={"/recruiter/manage-jobs"} component={ManageJobs} />
      <Route path={"/recruiter/edit-job/:id"} component={EditJob} />
      <Route path={"/recruiter/applicants"} component={Applicants} />

      {/* Admin Routes */}
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/admin/users"} component={AdminUsers} />
      <Route path={"/admin/companies"} component={AdminCompanies} />
      <Route path={"/admin/jobs"} component={AdminJobs} />
      <Route path={"/admin/applicants"} component={AdminApplicants} />
      <Route path={"/admin/reports"} component={AdminReports} />
      <Route path={"/admin/analytics"} component={AdminAnalytics} />

      {/* 404 */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
