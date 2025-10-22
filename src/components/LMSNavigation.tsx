import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { 
  Menu, 
  User, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  HelpCircle, 
  ClipboardCheck,
  StickyNote,
  Users,
  Video,
  LogOut
} from "lucide-react";
import { useState } from "react";

interface LMSNavigationProps {
  userType?: "student" | "teacher";
}

const LMSNavigation = ({ userType = "student" }: LMSNavigationProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Books", path: "/books", icon: BookOpen },
    { name: "Courses", path: "/courses", icon: GraduationCap },
    { name: "Tests", path: "/tests", icon: FileText },
    { name: "Quizzes", path: "/quizzes", icon: HelpCircle },
    { name: "Mock Tests", path: "/mock-tests", icon: ClipboardCheck },
    { name: "Notes", path: "/notes", icon: StickyNote },
    { name: "1:1 Mentorship", path: "/mentorship", icon: Users },
    { name: "Webinars", path: "/webinars", icon: Video },
  ];

  const hamburgerMenuItems = [
    { name: "User Profile", icon: User, action: () => console.log("Profile") },
    { name: "Notes", icon: StickyNote, path: "/notes" },
    { name: "Mock Test", icon: ClipboardCheck, path: "/mock-tests" },
    { name: "1:1 Mentorship", icon: Users, path: "/mentorship" },
    { name: "Quizzes", icon: HelpCircle, path: "/quizzes" },
    { name: "Webinars", icon: Video, path: "/webinars" },
    { name: "Logout", icon: LogOut, action: () => console.log("Logout") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Learnix</span>
        </Link>

        {/* Desktop Navigation - Only show Books and Courses */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Get Started</Button>
          </Link>

          {/* Desktop Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-6">
                <h3 className="font-semibold text-lg">Menu</h3>
                <Separator />
                
                {userType === "student" && (
                  <>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Last Lecture Flashcards</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="p-3 border rounded-lg bg-accent/30">
                            <p className="text-xs font-medium">Term {i}</p>
                            <p className="text-xs text-muted-foreground mt-1">Definition...</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {userType === "teacher" && (
                  <>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Enrolled Students</h4>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-2 border rounded-lg">
                            <p className="text-sm font-medium">Student {i}</p>
                            <p className="text-xs text-muted-foreground">Progress: {60 + i * 10}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                <div className="space-y-1">
                  {hamburgerMenuItems.map((item, index) => (
                    <div key={index}>
                      {item.path ? (
                        <Link to={item.path}>
                          <Button variant="ghost" className="w-full justify-start" size="sm">
                            {item.name}
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                          onClick={item.action}
                        >
                          {item.name}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-6">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Learnix</span>
              </Link>
              <Separator />

              {/* All Navigation Items */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant={isActive(item.path) ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      size="sm"
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>

              <Separator />

              {/* User Profile and Logout */}
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  User Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              <Separator />

              {/* Sign In / Get Started */}
              <div className="space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default LMSNavigation;
