import { useState } from "react";
import LMSNavigation from "@/components/LMSNavigation";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Search, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: 1,
      title: "Advanced Python Programming",
      instructor: "Dr. Sarah Johnson",
      progress: 65,
      enrolled: true,
      description: "Master advanced Python concepts and build real-world applications",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      instructor: "Prof. Michael Chen",
      progress: 30,
      enrolled: true,
      description: "Learn fundamental data structures and algorithmic thinking",
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      instructor: "John Smith",
      progress: 0,
      enrolled: false,
      description: "Complete guide to modern web development with React and Node.js",
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Dr. Emily Davis",
      progress: 45,
      enrolled: true,
      description: "Introduction to ML algorithms and practical applications",
    },
    {
      id: 5,
      title: "Digital Marketing Mastery",
      instructor: "Lisa Anderson",
      progress: 0,
      enrolled: false,
      description: "Learn modern digital marketing strategies and tools",
    },
    {
      id: 6,
      title: "Mobile App Development",
      instructor: "Prof. James Wilson",
      progress: 80,
      enrolled: true,
      description: "Build native mobile apps for iOS and Android",
    },
  ];

  const handleEnroll = (courseTitle: string) => {
    toast.success(`Enrolled in "${courseTitle}"`);
  };

  const handleContinue = (courseTitle: string) => {
    toast.info(`Continuing "${courseTitle}"`);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <LMSNavigation userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Courses</h1>
          <p className="text-muted-foreground">Browse and manage your learning journey</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search courses by title or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Featured Courses Carousel */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-accent rounded-md mb-3 flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                  <p className="text-sm mb-3">{course.description}</p>
                  {course.enrolled && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {course.enrolled ? (
                    <Button
                      className="w-full"
                      onClick={() => handleContinue(course.title)}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleEnroll(course.title)}
                    >
                      Enroll
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-accent rounded-md mb-3 flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                  <p className="text-sm mb-3">{course.description}</p>
                  {course.enrolled && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {course.enrolled ? (
                    <Button
                      className="w-full"
                      onClick={() => handleContinue(course.title)}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleEnroll(course.title)}
                    >
                      Enroll
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default Courses;
