import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DashboardStats } from "./dashboard-stats";
import { StreakTracker } from "./streak-tracker";
import { BadgeSystem } from "./badge-system";
import { PlacementCalendar } from "./placement-calendar";
import { JobApplications } from "./job-applications";
import { MockTests } from "./mock-tests";
import { ResumeBuilder } from "./resume-builder";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Settings, User, LogOut, Home, BookOpen, FileText, Calendar, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">Student Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Alex!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/student/practice-exams")}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Practice Exams
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/student/resume-builder")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Resume Builder
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/student/job-applications")}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    Job Applications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/student/calendar")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <ThemeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/student/profile")}>
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/")} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Stats Overview */}
          <section className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Overview</h2>
            <DashboardStats />
          </section>

          {/* Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <JobApplications />
              <MockTests />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <StreakTracker />
              <PlacementCalendar />
              <ResumeBuilder />
              <BadgeSystem />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}