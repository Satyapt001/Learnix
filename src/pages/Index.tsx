import { Button } from "@/components/ui/button";
import { GraduationCap, Brain, Users, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold">Learnix</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning Platform
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Adaptive Learning for{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Every Mind
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience personalized education powered by AI. Learnix adapts to your unique learning style, 
            pace, and goals to help you achieve more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Learning Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Why Choose Learnix?</h2>
          <p className="text-xl text-muted-foreground">
            Smart education tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Brain,
              title: "AI-Powered",
              description: "Intelligent algorithms adapt to your learning style and pace",
            },
            {
              icon: Users,
              title: "Personalized Mentorship",
              description: "Get guidance tailored to your unique goals and challenges",
            },
            {
              icon: Target,
              title: "Goal Tracking",
              description: "Set objectives and monitor your progress in real-time",
            },
            {
              icon: Sparkles,
              title: "Smart Content",
              description: "Curated learning materials that match your skill level",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card border rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="gradient-hero rounded-3xl p-12 lg:p-20 text-center text-white space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of students and educators already using Learnix to achieve their educational goals.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Learnix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Learnix. Adaptive Learning for Every Mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
