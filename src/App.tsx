import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import StudentDashboard from "./pages/student/Dashboard";
import PracticeExams from "./pages/student/PracticeExams";
import ResumeBuilder from "./pages/student/ResumeBuilder";
import JobApplications from "./pages/student/JobApplications";
import Calendar from "./pages/student/Calendar";
import { StudentProfile } from "./components/profile/StudentProfile";
import CompanyDashboard from "./pages/company/Dashboard";
import TPODashboard from "./pages/tpo/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Index />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/practice-exams" element={<PracticeExams />} />
          <Route path="/student/resume-builder" element={<ResumeBuilder />} />
          <Route path="/student/job-applications" element={<JobApplications />} />
          <Route path="/student/calendar" element={<Calendar />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/tpo/dashboard" element={<TPODashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
