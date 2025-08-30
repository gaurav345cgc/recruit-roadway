import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Edit, Eye, Plus, CheckCircle } from "lucide-react";

interface ResumeVersion {
  id: string;
  name: string;
  completeness: number;
  lastUpdated: string;
  isDefault: boolean;
  status: "draft" | "complete" | "outdated";
}

const resumeVersions: ResumeVersion[] = [
  {
    id: "1",
    name: "Software Engineer Resume",
    completeness: 85,
    lastUpdated: "2024-01-20",
    isDefault: true,
    status: "complete"
  },
  {
    id: "2",
    name: "Data Science Resume", 
    completeness: 60,
    lastUpdated: "2024-01-15",
    isDefault: false,
    status: "draft"
  },
  {
    id: "3",
    name: "Product Management Resume",
    completeness: 45,
    lastUpdated: "2024-01-10",
    isDefault: false,
    status: "draft"
  }
];

export function ResumeBuilder() {
  const getStatusColor = (status: ResumeVersion["status"]) => {
    switch (status) {
      case "complete":
        return "bg-success/20 text-success border-success/30";
      case "draft":
        return "bg-warning/20 text-warning border-warning/30";
      case "outdated":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 80) return "text-success";
    if (completeness >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Resume Builder
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {resumeVersions.length} resume versions
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {resumeVersions.map((resume, index) => (
          <div
            key={resume.id}
            className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    {resume.name}
                    {resume.isDefault && (
                      <Badge variant="outline" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Updated {new Date(resume.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <Badge className={getStatusColor(resume.status)}>
                {resume.status === "complete" && <CheckCircle className="h-3 w-3 mr-1" />}
                {resume.status}
              </Badge>
            </div>

            {/* Completeness */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completeness</span>
                <span className={`font-medium ${getCompletenessColor(resume.completeness)}`}>
                  {resume.completeness}%
                </span>
              </div>
              <Progress 
                value={resume.completeness} 
                className="h-2 animate-progress-fill"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-3 w-3 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-3 w-3 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-lg font-semibold text-primary">
              {resumeVersions.filter(r => r.status === "complete").length}
            </div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-lg font-semibold text-primary">
              {Math.round(resumeVersions.reduce((acc, r) => acc + r.completeness, 0) / resumeVersions.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Avg Score</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}