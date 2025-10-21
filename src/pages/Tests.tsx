import { useState } from "react";
import LMSNavigation from "@/components/LMSNavigation";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Clock, Calendar } from "lucide-react";
import { toast } from "sonner";

const Tests = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const tests = [
    {
      id: 1,
      name: "Python Midterm Exam",
      subject: "Programming",
      duration: "2 hours",
      dueDate: "2025-11-15",
      status: "pending",
      score: null,
    },
    {
      id: 2,
      name: "Data Structures Final",
      subject: "Computer Science",
      duration: "3 hours",
      dueDate: "2025-11-20",
      status: "pending",
      score: null,
    },
    {
      id: 3,
      name: "Web Development Quiz",
      subject: "Development",
      duration: "1 hour",
      dueDate: "2025-10-10",
      status: "completed",
      score: 85,
    },
    {
      id: 4,
      name: "Machine Learning Test",
      subject: "AI/ML",
      duration: "2.5 hours",
      dueDate: "2025-11-25",
      status: "pending",
      score: null,
    },
    {
      id: 5,
      name: "Database Systems Exam",
      subject: "Databases",
      duration: "2 hours",
      dueDate: "2025-10-05",
      status: "completed",
      score: 92,
    },
  ];

  const handleStartTest = (testName: string) => {
    toast.success(`Starting "${testName}"`);
  };

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingTests = filteredTests.filter((t) => t.status === "pending");
  const completedTests = filteredTests.filter((t) => t.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      <LMSNavigation userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Tests</h1>
          <p className="text-muted-foreground">Manage your formal assessments and track scores</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search tests by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Pending Tests */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <FileText className="w-8 h-8 text-primary" />
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{test.subject}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Due: {test.dueDate}</span>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => handleStartTest(test.name)}
                    >
                      Start Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Tests */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <FileText className="w-8 h-8 text-primary" />
                    <Badge>Completed</Badge>
                  </div>
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{test.subject}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Completed: {test.dueDate}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-2xl font-bold text-primary">{test.score}%</p>
                      <p className="text-xs text-muted-foreground">Your Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default Tests;
