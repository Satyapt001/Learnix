import { ReactNode } from "react";
import heroImage from "@/assets/hero-learning.jpg";
import { GraduationCap } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title = "Welcome to Learnix", subtitle = "Your smart learning companion" }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero p-12 flex-col justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-2xl font-semibold">Learnix</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold leading-tight">{title}</h1>
            <p className="text-xl text-white/90">{subtitle}</p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={heroImage} 
              alt="Students learning together" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="text-sm text-white/70">
          Adaptive Learning for Every Mind
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
