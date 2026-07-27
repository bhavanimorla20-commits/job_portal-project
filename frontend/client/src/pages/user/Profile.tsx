import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Trash2, Plus } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Profile() {
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
    location: "San Francisco, CA",
    headline: "Senior React Developer",
    bio: "Passionate about building scalable web applications with modern technologies.",
    skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL"],
    experience: [
      { id: 1, title: "Senior React Developer", company: "TechCorp", duration: "2021 - Present", description: "Led frontend development for multiple projects" },
      { id: 2, title: "React Developer", company: "StartupXYZ", duration: "2019 - 2021", description: "Developed and maintained React applications" },
    ],
    education: [
      { id: 1, school: "University of California", degree: "B.S. Computer Science", year: "2019" },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Profile saved:", profileData);
    setIsEditing(false);
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your profile and professional information</p>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="glass-card p-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-3xl font-bold text-accent">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="headline">Professional Headline</Label>
                      <Input
                        id="headline"
                        name="headline"
                        value={profileData.headline}
                        onChange={handleChange}
                        placeholder="e.g., Senior React Developer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                    <p className="text-lg text-accent mb-2">{profileData.headline}</p>
                    <p className="text-muted-foreground">{profileData.bio}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            {isEditing ? (
              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-border">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-border text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{profileData.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{profileData.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">{profileData.location}</p>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex gap-3 pt-6 border-t border-border">
                <Button className="flex-1 btn-premium" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Skills</h3>
                  {isEditing && <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2" />Add Skill</Button>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1">
                      {skill}
                      {isEditing && <Trash2 className="w-3 h-3 ml-2 cursor-pointer" />}
                    </Badge>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <Card className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Experience</h3>
                  {isEditing && <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2" />Add Experience</Button>}
                </div>
                {profileData.experience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-lg bg-background/50 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold">{exp.title}</p>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      </div>
                      {isEditing && <Trash2 className="w-4 h-4 text-muted-foreground cursor-pointer" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{exp.duration}</p>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Education</h3>
                  {isEditing && <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2" />Add Education</Button>}
                </div>
                {profileData.education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-lg bg-background/50 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.school}</p>
                      </div>
                      {isEditing && <Trash2 className="w-4 h-4 text-muted-foreground cursor-pointer" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </Card>
            </TabsContent>
          </Tabs>

          {/* Resume Section */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Resume</h3>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="font-medium mb-1">Upload your resume</p>
              <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
