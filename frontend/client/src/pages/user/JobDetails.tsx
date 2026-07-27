import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Share2, Bookmark, BookmarkCheck } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

const JOB_DATA = {
  id: 1,
  title: "Senior React Developer",
  company: "TechCorp",
  logo: "TC",
  salary: "$120k - $160k",
  experience: "5+ years",
  type: "Full-time",
  mode: "Remote",
  location: "San Francisco, CA",
  postedDate: "2 days ago",
  deadline: "30 days",
  skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL"],
  description: "We are looking for an experienced Senior React Developer to join our growing team. You will work on building scalable, high-performance web applications using modern technologies.",
  responsibilities: [
    "Design and develop high-quality React components and applications",
    "Collaborate with product and design teams to implement new features",
    "Mentor junior developers and contribute to code reviews",
    "Optimize application performance and implement best practices",
    "Participate in architectural discussions and technical planning",
  ],
  requirements: [
    "5+ years of professional React development experience",
    "Strong proficiency in TypeScript and modern JavaScript",
    "Experience with Node.js and backend integration",
    "Familiarity with AWS services and cloud deployment",
    "Excellent problem-solving and communication skills",
    "Experience with testing frameworks and CI/CD pipelines",
  ],
  benefits: [
    "Competitive salary and equity",
    "Comprehensive health insurance",
    "Unlimited PTO",
    "Remote work flexibility",
    "Professional development budget",
    "Collaborative and inclusive team environment",
  ],
  companyInfo: {
    name: "TechCorp",
    industry: "Technology",
    size: "500-1000 employees",
    founded: "2015",
    website: "www.techcorp.com",
    description: "TechCorp is a leading technology company specializing in cloud solutions and enterprise software.",
  },
  applicants: 45,
};

const RELATED_JOBS = [
  { id: 2, title: "Full Stack Developer", company: "TechCorp", salary: "$110k-$150k" },
  { id: 3, title: "Frontend Engineer", company: "StartupXYZ", salary: "$100k-$140k" },
  { id: 4, title: "React Developer", company: "DesignStudio", salary: "$90k-$130k" },
];

export default function JobDetails() {
  const [, navigate] = useLocation();
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4">
          <button
            onClick={() => navigate("/user/browse-jobs")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse Jobs
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <Card className="glass-card p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center font-bold text-accent text-xl">
                    {JOB_DATA.logo}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{JOB_DATA.title}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{JOB_DATA.company}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge>{JOB_DATA.type}</Badge>
                      <Badge variant="secondary">{JOB_DATA.mode}</Badge>
                      <Badge variant="outline">{JOB_DATA.experience}</Badge>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSaved(!saved)}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  {saved ? (
                    <BookmarkCheck className="w-6 h-6 text-accent" />
                  ) : (
                    <Bookmark className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-4 pt-6 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Salary</p>
                  <p className="font-semibold">{JOB_DATA.salary}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold">{JOB_DATA.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Posted</p>
                  <p className="font-semibold">{JOB_DATA.postedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Applicants</p>
                  <p className="font-semibold">{JOB_DATA.applicants}</p>
                </div>
              </div>
            </Card>

            {/* Job Description */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">Job Description</h2>
              <p className="text-muted-foreground mb-6">{JOB_DATA.description}</p>

              <h3 className="text-xl font-bold mb-4">Responsibilities</h3>
              <ul className="space-y-2 mb-8">
                {JOB_DATA.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="text-accent font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mb-4">Requirements</h3>
              <ul className="space-y-2 mb-8">
                {JOB_DATA.requirements.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="text-accent font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mb-4">Benefits</h3>
              <ul className="space-y-2">
                {JOB_DATA.benefits.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="text-accent font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Skills */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {JOB_DATA.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="px-4 py-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Company Info */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">About {JOB_DATA.companyInfo.name}</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry</p>
                  <p className="font-semibold">{JOB_DATA.companyInfo.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company Size</p>
                  <p className="font-semibold">{JOB_DATA.companyInfo.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Founded</p>
                  <p className="font-semibold">{JOB_DATA.companyInfo.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Website</p>
                  <p className="font-semibold text-accent">{JOB_DATA.companyInfo.website}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{JOB_DATA.companyInfo.description}</p>
            </Card>

            {/* Related Jobs */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Related Opportunities</h2>
              <div className="space-y-4">
                {RELATED_JOBS.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">{job.salary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card p-6 space-y-4 sticky top-24">
              <Button className="w-full btn-premium" onClick={() => navigate(`/user/apply/${JOB_DATA.id}`)}>
                Apply Now
              </Button>

              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Job
              </Button>

              <Separator />

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Application Deadline</p>
                  <p className="font-semibold">{JOB_DATA.deadline}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Job Type</p>
                  <p className="font-semibold">{JOB_DATA.type}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Experience Level</p>
                  <p className="font-semibold">{JOB_DATA.experience}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Work Mode</p>
                  <p className="font-semibold">{JOB_DATA.mode}</p>
                </div>
              </div>

              <Separator />

              <div className="bg-accent/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Match Score</p>
                <p className="text-2xl font-bold text-accent">92%</p>
                <p className="text-xs text-muted-foreground mt-2">Based on your profile and skills</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
