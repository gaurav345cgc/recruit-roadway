import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  GraduationCap, 
  Building2, 
  Shield, 
  ArrowRight, 
  Users,
  BookOpen,
  Target,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
  Briefcase,
  FileText,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Smart Job Matching",
    description: "AI-powered job recommendations based on your skills and preferences"
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Mock Tests & Practice",
    description: "Comprehensive aptitude, coding, and interview preparation tests"
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Placement Calendar",
    description: "Never miss important dates with integrated calendar and reminders"
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Achievement System",
    description: "Earn badges and maintain streaks to stay motivated"
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Resume Builder",
    description: "Professional resume templates with real-time preview"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics Dashboard",
    description: "Track your progress with detailed analytics and insights"
  }
];

const stats = [
  { label: "Students Placed", value: "10,000+", icon: <Users className="h-5 w-5" /> },
  { label: "Partner Companies", value: "500+", icon: <Building2 className="h-5 w-5" /> },
  { label: "Success Rate", value: "85%", icon: <TrendingUp className="h-5 w-5" /> },
  { label: "Average Package", value: "₹12 LPA", icon: <Briefcase className="h-5 w-5" /> }
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    content: "HireLink helped me prepare systematically and land my dream job. The mock tests were incredibly helpful!",
    rating: 5
  },
  {
    name: "Rahul Patel",
    role: "Data Scientist at Microsoft",
    content: "The analytics dashboard showed me exactly where to improve. Got placed in Tier-1 company!",
    rating: 5
  },
  {
    name: "Dr. Meena Singh",
    role: "TPO, IIT Delhi",
    content: "HireLink streamlined our entire placement process. Managing 1000+ students has never been easier.",
    rating: 5
  }
];

export default function Landing() {
  const [loginType, setLoginType] = useState<"student" | "company" | "tpo">("student");
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Simulate login process
    const paths = {
      student: "/student/dashboard",
      company: "/company/dashboard", 
      tpo: "/tpo/dashboard"
    };
    navigate(paths[loginType]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">HireLink</h1>
                <p className="text-xs text-muted-foreground">Placement Made Simple</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Get Started</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Welcome to HireLink</DialogTitle>
                    <DialogDescription>
                      Choose your role and sign in to continue
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs value={loginType} onValueChange={(v) => setLoginType(v as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="student">Student</TabsTrigger>
                      <TabsTrigger value="company">Company</TabsTrigger>
                      <TabsTrigger value="tpo">TPO</TabsTrigger>
                    </TabsList>
                    
                    {["student", "company", "tpo"].map((type) => (
                      <TabsContent key={type} value={type} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder={`${type}@hirelink.com`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Enter password" />
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleLogin("", "")}
                        >
                          Sign In as {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                          Don't have an account? <span className="text-primary cursor-pointer">Sign up</span>
                        </p>
                      </TabsContent>
                    ))}
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Your Gateway to 
            <br />Career Success
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Complete placement preparation platform connecting students, companies, and placement officers
            for seamless career opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="px-8 py-4 text-lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                {/* Same login dialog content as above */}
                <DialogHeader>
                  <DialogTitle>Welcome to HireLink</DialogTitle>
                  <DialogDescription>
                    Choose your role and sign in to continue
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="student" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="tpo">TPO</TabsTrigger>
                  </TabsList>
                  
                  {["student", "company", "tpo"].map((type) => (
                    <TabsContent key={type} value={type} className="space-y-4">
                      <Button 
                        className="w-full" 
                        onClick={() => navigate(`/${type}/dashboard`)}
                      >
                        Continue as {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    </TabsContent>
                  ))}
                </Tabs>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for Placement Success
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive tools and features designed for modern placement processes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20 bg-gradient-card">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-foreground">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Placement Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who have successfully landed their dream jobs with HireLink.
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 py-4 text-lg">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {/* Same login dialog */}
              <DialogHeader>
                <DialogTitle>Join HireLink Today</DialogTitle>
                <DialogDescription>
                  Choose your role to get started
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate("/student/dashboard")}
                >
                  <GraduationCap className="mr-3 h-5 w-5" />
                  Continue as Student
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate("/company/dashboard")}
                >
                  <Building2 className="mr-3 h-5 w-5" />
                  Continue as Company
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate("/tpo/dashboard")}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  Continue as TPO
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg">HireLink</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting talent with opportunities through innovative placement solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Job Applications</li>
                <li>Mock Tests</li>
                <li>Resume Builder</li>
                <li>Career Guidance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Companies</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Post Jobs</li>
                <li>Candidate Search</li>
                <li>Interview Management</li>
                <li>Analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 HireLink. All rights reserved. Built with ❤️ for career success.
          </div>
        </div>
      </footer>
    </div>
  );
}