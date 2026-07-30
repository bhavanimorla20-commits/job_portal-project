import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { useState } from "react";

export default function ApplyJob() {
  const [, navigate] = useLocation();
  const [, params]= useRoute("/user/apply/:jobId");
  const jobId = params?.jobId
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: "",
    portfolioLink: "",
    additionalNotes: "",
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          setUploadProgress(100);
          clearInterval(interval);
        } else {
          setUploadProgress(progress);
        }
      }, 200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const userId = localStorage.getItem("user_id");

  if (!userId) {
    alert("Please login first.");
    navigate("/login");
    return;
  }

  try {
    const response = await fetch(
      `https://job-portal-project-tl24.onrender.com/apply/${jobId}?user_id=${userId}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Application submitted successfully!");
      navigate("/user/applications");
    } else {
      alert(data.message || "Application failed");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};

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
            Back to Job
          </button>
          <div>
            <h1 className="text-2xl font-bold">Apply for Senior React Developer</h1>
            <p className="text-sm text-muted-foreground">at TechCorp</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h2 className="text-xl font-bold mb-4">Resume</h2>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume"
                    required
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    {formData.resume ? (
                      <div className="space-y-2">
                        <FileText className="w-8 h-8 mx-auto text-accent" />
                        <p className="font-medium">{formData.resume.name}</p>
                        {uploadProgress < 100 && (
                          <div className="w-full bg-border rounded-full h-2 mt-2">
                            <div
                              className="bg-accent h-2 rounded-full transition-all"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        )}
                        {uploadProgress === 100 && (
                          <p className="text-sm text-green-600">Upload complete</p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h2 className="text-xl font-bold mb-4">Cover Letter</h2>
                <Label htmlFor="coverLetter">Tell us why you're a great fit for this role</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Write your cover letter here..."
                  rows={6}
                  className="mt-2"
                />
              </div>

              {/* Portfolio Link */}
              <div>
                <Label htmlFor="portfolioLink">Portfolio Link (Optional)</Label>
                <Input
                  id="portfolioLink"
                  name="portfolioLink"
                  type="url"
                  value={formData.portfolioLink}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Any additional information you'd like to share..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1 btn-premium">
                  Submit Application
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/user/browse-jobs")}
                >
                  Cancel
                </Button>
              </div>

              {/* Info Box */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-sm text-muted-foreground">
                <p>
                  <strong>Note:</strong> By submitting this application, you agree to our Terms of Service and Privacy Policy. We'll review your application and get back to you within 5 business days.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
