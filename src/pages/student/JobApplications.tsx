import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock,
  Search,
  Filter,
  Eye,
  ExternalLink,
  Building2,
  TrendingUp,
  Users,
  Star,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  tier: 1 | 2 | 3;
  appliedDate: string;
  status: "Applied" | "Test" | "Shortlisted" | "Interview" | "Offer" | "Rejected" | "Joined";
  deadline: string;
  description: string;
  requirements: string[];
  nextStep?: string;
  progress: number;
}

interface AvailableJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tier: 1 | 2 | 3;
  deadline: string;
  description: string;
  requirements: string[];
  applicants: number;
  rating: number;
}

const applicationStatuses = ["All", "Applied", "Test", "Shortlisted", "Interview", "Offer", "Rejected"];
const tierFilters = ["All Tiers", "Tier 1", "Tier 2", "Tier 3"];

const mockApplications: JobApplication[] = [
  {
    id: "1",
    jobTitle: "Software Engineer",
    company: "Google",
    location: "Bangalore",
    salary: "₹18-25 LPA",
    tier: 1,
    appliedDate: "2024-01-15",
    status: "Interview",
    deadline: "2024-02-15",
    description: "Develop and maintain scalable web applications",
    requirements: ["JavaScript", "React", "Node.js", "System Design"],
    nextStep: "Technical Interview - Feb 20, 2024",
    progress: 75
  },
  {
    id: "2",
    jobTitle: "Data Scientist", 
    company: "Microsoft",
    location: "Hyderabad",
    salary: "₹15-22 LPA",
    tier: 1,
    appliedDate: "2024-01-20",
    status: "Shortlisted",
    deadline: "2024-02-20",
    description: "Build ML models and analyze large datasets",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
    nextStep: "Coding Round - Feb 25, 2024",
    progress: 50
  },
  {
    id: "3",
    jobTitle: "Frontend Developer",
    company: "Flipkart",
    location: "Bangalore", 
    salary: "₹12-18 LPA",
    tier: 2,
    appliedDate: "2024-01-10",
    status: "Rejected",
    deadline: "2024-02-10",
    description: "Create engaging user interfaces for e-commerce platform",
    requirements: ["React", "TypeScript", "CSS", "Mobile-first Design"],
    progress: 25
  },
  {
    id: "4",
    jobTitle: "Backend Engineer",
    company: "Zomato",
    location: "Delhi",
    salary: "₹10-15 LPA", 
    tier: 2,
    appliedDate: "2024-01-25",
    status: "Test",
    deadline: "2024-02-25", 
    description: "Build robust APIs and microservices",
    requirements: ["Java", "Spring Boot", "MongoDB", "AWS"],
    nextStep: "Online Assessment - Feb 28, 2024",
    progress: 30
  },
  {
    id: "5",
    jobTitle: "Full Stack Developer",
    company: "Paytm",
    location: "Noida",
    salary: "₹8-12 LPA",
    tier: 3,
    appliedDate: "2024-02-01", 
    status: "Applied",
    deadline: "2024-03-01",
    description: "Develop end-to-end web applications",
    requirements: ["MERN Stack", "REST APIs", "Git", "Testing"],
    progress: 10
  }
];

const availableJobs: AvailableJob[] = [
  {
    id: "6",
    title: "Senior SDE",
    company: "Amazon",
    location: "Bangalore", 
    salary: "₹20-30 LPA",
    tier: 1,
    deadline: "2024-03-15",
    description: "Lead software development projects and mentor junior developers",
    requirements: ["Java", "System Design", "Leadership", "AWS"],
    applicants: 245,
    rating: 4.8
  },
  {
    id: "7", 
    title: "Product Manager",
    company: "Uber",
    location: "Bangalore",
    salary: "₹16-24 LPA", 
    tier: 1,
    deadline: "2024-03-20",
    description: "Drive product strategy and work with cross-functional teams",
    requirements: ["Product Management", "Analytics", "Communication", "Strategy"],
    applicants: 180,
    rating: 4.6
  },
  {
    id: "8",
    title: "DevOps Engineer", 
    company: "Swiggy",
    location: "Bangalore",
    salary: "₹12-18 LPA",
    tier: 2, 
    deadline: "2024-03-10",
    description: "Manage CI/CD pipelines and infrastructure automation",
    requirements: ["Docker", "Kubernetes", "AWS", "Jenkins"],
    applicants: 120,
    rating: 4.4
  }
];

export default function JobApplications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"applications" | "available">("applications");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All Tiers");

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesTier = tierFilter === "All Tiers" || tierFilter === `Tier ${app.tier}`;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const filteredJobs = availableJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "All Tiers" || tierFilter === `Tier ${job.tier}`;
    
    return matchesSearch && matchesTier;
  });

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return "bg-tier1/20 text-tier1 border-tier1/30";
      case 2: return "bg-tier2/20 text-tier2 border-tier2/30"; 
      case 3: return "bg-tier3/20 text-tier3 border-tier3/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied": return "bg-muted text-muted-foreground";
      case "Test": return "bg-warning/20 text-warning border-warning/30";
      case "Shortlisted": return "bg-primary/20 text-primary border-primary/30";
      case "Interview": return "bg-success/20 text-success border-success/30";
      case "Offer": return "bg-tier1/20 text-tier1 border-tier1/30";
      case "Rejected": return "bg-destructive/20 text-destructive border-destructive/30";
      case "Joined": return "bg-success/20 text-success border-success/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Offer": return <CheckCircle className="h-4 w-4" />;
      case "Rejected": return <XCircle className="h-4 w-4" />;
      case "Interview": return <Users className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const stats = {
    totalApplications: mockApplications.length,
    pending: mockApplications.filter(app => !["Rejected", "Joined"].includes(app.status)).length,
    shortlisted: mockApplications.filter(app => ["Shortlisted", "Interview", "Offer"].includes(app.status)).length,
    offers: mockApplications.filter(app => app.status === "Offer").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/student/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="font-bold text-xl text-foreground">Job Applications</h1>
                <p className="text-sm text-muted-foreground">Track and manage your job applications</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalApplications}</div>
              <div className="text-sm text-muted-foreground">Total Applied</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.shortlisted}</div>
              <div className="text-sm text-muted-foreground">Shortlisted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.offers}</div>
              <div className="text-sm text-muted-foreground">Offers</div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant={activeTab === "applications" ? "default" : "outline"}
            onClick={() => setActiveTab("applications")}
          >
            My Applications ({mockApplications.length})
          </Button>
          <Button
            variant={activeTab === "available" ? "default" : "outline"} 
            onClick={() => setActiveTab("available")}
          >
            Available Jobs ({availableJobs.length})
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6 animate-slide-up">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {activeTab === "applications" && (
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tierFilters.map(tier => (
                    <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {filteredApplications.map((application, index) => (
              <Card 
                key={application.id}
                className="hover:shadow-medium transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                        <Badge className={getTierColor(application.tier)}>
                          Tier {application.tier}
                        </Badge>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{application.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {application.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {application.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {application.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied {application.appliedDate}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{application.description}</p>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Application Progress</span>
                          <span className="font-medium">{application.progress}%</span>
                        </div>
                        <Progress value={application.progress} className="h-2" />
                      </div>

                      {application.nextStep && (
                        <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                          <div className="text-sm font-medium text-primary">Next Step:</div>
                          <div className="text-sm text-foreground">{application.nextStep}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{application.jobTitle} - {application.company}</DialogTitle>
                            <DialogDescription>Application details and requirements</DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Job Description</h4>
                              <p className="text-sm text-muted-foreground">{application.description}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Requirements</h4>
                              <div className="flex flex-wrap gap-2">
                                {application.requirements.map((req, i) => (
                                  <Badge key={i} variant="outline">{req}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <div><strong>Deadline:</strong> {application.deadline}</div>
                              <div><strong>Status:</strong> {application.status}</div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredApplications.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No applications found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Available Jobs Tab */}
        {activeTab === "available" && (
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <Card 
                key={job.id}
                className="hover:shadow-medium transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <Badge className={getTierColor(job.tier)}>
                          Tier {job.tier}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span>{job.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Deadline: {job.deadline}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{job.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 4).map((req, i) => (
                          <Badge key={i} variant="outline">{req}</Badge>
                        ))}
                        {job.requirements.length > 4 && (
                          <Badge variant="outline">+{job.requirements.length - 4} more</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{job.title} - {job.company}</DialogTitle>
                            <DialogDescription>Job details and requirements</DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Requirements</h4>
                              <div className="flex flex-wrap gap-2">
                                {job.requirements.map((req, i) => (
                                  <Badge key={i} variant="outline">{req}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}