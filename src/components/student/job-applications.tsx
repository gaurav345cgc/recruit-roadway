import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Building2, MapPin, DollarSign, Calendar, ArrowRight, Filter, Briefcase } from "lucide-react";

interface JobApplication {
  id: string;
  company: string;
  position: string;
  tier: "tier1" | "tier2" | "tier3";
  package: string;
  location: string;
  appliedDate: string;
  status: "applied" | "test" | "shortlisted" | "interview" | "offer" | "rejected";
  nextStep?: string;
  nextStepDate?: string;
}

const applications: JobApplication[] = [
  {
    id: "1",
    company: "Google",
    position: "Software Engineer",
    tier: "tier1",
    package: "₹22 LPA",
    location: "Bangalore",
    appliedDate: "2024-01-20",
    status: "interview",
    nextStep: "Final Interview",
    nextStepDate: "2024-01-25"
  },
  {
    id: "2",
    company: "Microsoft",
    position: "SDE I",
    tier: "tier1",
    package: "₹18 LPA",
    location: "Hyderabad",
    appliedDate: "2024-01-18",
    status: "test",
    nextStep: "Online Assessment",
    nextStepDate: "2024-01-26"
  },
  {
    id: "3",
    company: "Wipro",
    position: "Graduate Engineer Trainee",
    tier: "tier3",
    package: "₹4.5 LPA",
    location: "Chennai",
    appliedDate: "2024-01-15",
    status: "offer",
    nextStep: "Response Required",
    nextStepDate: "2024-01-28"
  }
];

export function JobApplications() {
  const [filter, setFilter] = useState<string>("all");

  const getStatusColor = (status: JobApplication["status"]) => {
    switch (status) {
      case "applied":
        return "bg-muted text-muted-foreground";
      case "test":
        return "bg-warning/20 text-warning border-warning/30";
      case "shortlisted":
        return "bg-primary/20 text-primary border-primary/30";
      case "interview":
        return "bg-success/20 text-success border-success/30";
      case "offer":
        return "bg-badge-gold/20 text-badge-gold border-badge-gold/30";
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTierColor = (tier: JobApplication["tier"]) => {
    switch (tier) {
      case "tier1":
        return "bg-tier1/20 text-tier1 border-tier1/30";
      case "tier2":
        return "bg-tier2/20 text-tier2 border-tier2/30";
      case "tier3":
        return "bg-tier3/20 text-tier3 border-tier3/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusProgress = (status: JobApplication["status"]) => {
    switch (status) {
      case "applied": return 20;
      case "test": return 40;
      case "shortlisted": return 60;
      case "interview": return 80;
      case "offer": return 100;
      case "rejected": return 0;
      default: return 0;
    }
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Job Applications
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {applications.length} active applications
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {applications.map((app, index) => (
          <div
            key={app.id}
            className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  {app.company}
                </h4>
                <p className="text-sm text-muted-foreground">{app.position}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={getTierColor(app.tier)}>
                  {app.tier.toUpperCase()}
                </Badge>
                <Badge className={getStatusColor(app.status)}>
                  {app.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>{app.package}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{app.location}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Application Progress</span>
                <span>{getStatusProgress(app.status)}%</span>
              </div>
              <Progress 
                value={getStatusProgress(app.status)} 
                className="h-1.5 animate-progress-fill"
              />
            </div>

            {/* Next Step */}
            {app.nextStep && (
              <div className="flex items-center justify-between p-2 bg-primary/5 rounded-lg">
                <div className="text-sm">
                  <div className="font-medium text-foreground">{app.nextStep}</div>
                  {app.nextStepDate && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(app.nextStepDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}

        <Button variant="outline" className="w-full">
          <Building2 className="h-4 w-4 mr-2" />
          View All Applications
        </Button>
      </CardContent>
    </Card>
  );
}