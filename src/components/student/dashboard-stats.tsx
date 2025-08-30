import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Briefcase, CheckCircle, Clock, Target, Award } from "lucide-react";

interface StatItem {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  progress?: number;
  color: string;
}

const stats: StatItem[] = [
  {
    id: "applications",
    title: "Applications",
    value: 12,
    subtitle: "This month",
    icon: <Briefcase className="h-5 w-5" />,
    trend: "up",
    trendValue: "+3",
    color: "text-primary"
  },
  {
    id: "interviews",
    title: "Interviews",
    value: 4,
    subtitle: "Scheduled",
    icon: <CheckCircle className="h-5 w-5" />,
    trend: "up",
    trendValue: "+2",
    color: "text-success"
  },
  {
    id: "tests",
    title: "Tests Completed",
    value: 28,
    subtitle: "Practice & Live",
    icon: <Target className="h-5 w-5" />,
    progress: 70,
    color: "text-warning"
  },
  {
    id: "profile",
    title: "Profile Score",
    value: "85%",
    subtitle: "Resume strength",
    icon: <Award className="h-5 w-5" />,
    progress: 85,
    color: "text-badge-gold"
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.id} 
          className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-primary/10 ${stat.color}`}>
                {stat.icon}
              </div>
              {stat.trend && (
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    stat.trend === "up" ? "text-success border-success/30" : 
                    stat.trend === "down" ? "text-destructive border-destructive/30" : 
                    "text-muted-foreground"
                  }`}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trendValue}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
              <div className="text-xs font-medium text-foreground">{stat.title}</div>
            </div>

            {stat.progress && (
              <div className="mt-3">
                <Progress 
                  value={stat.progress} 
                  className="h-1.5 animate-progress-fill"
                  style={{ '--progress-width': `${stat.progress}%` } as React.CSSProperties}
                />
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {stat.progress}%
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}