import { useState } from "react";
import LMSNavigation from "@/components/LMSNavigation";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, ClipboardCheck, Clock, Target } from "lucide-react";
import { toast } from "sonner";

const MockTests = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const mockTests = [
    {
      id: 1,
      name: "SAT Practice Test",
      subject: "Standardized Test",
      duration: "3 hours",
      format: "Multiple Choice",
      sections: 4,
      lastScore: 1450,
      maxScore: 1600,
    },
    {
      id: 2,
      name: "GRE Mock Exam",
      subject: "Graduate Admissions",
      duration: "3 hours 45 min",
      format: "Multiple Choice",
      sections: 6,
      lastScore: 325,
      maxScore: 340,
    },
    {
      id: 3,
      name: "IELTS Speaking Practice",
      subject: "Language Proficiency",
      duration: "11-14 min",
      format: "Oral Interview",
      sections: 3,
      lastScore: 7.5,
      maxScore: 9,
    },
    {
      id: 4,
      name: "GMAT Practice Test",
      subject: "Business School",
      duration: "3.5 hours",
      format: "Multiple Choice",
      sections: 4,
      lastScore: 680,
      maxScore: 800,
    },
  ];

  const handleStartPractice = (testName: string) => {
    toast.success(`Starting practice mode for "${testName}"`);
  };

  const handleTimedMode = (testName: string) => {
    toast.success(`Starting timed mode for "${testName}"`);
  };

  const filteredMockTests = mockTests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <LMSNavigation userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Mock Tests</h1>
          <p className="text-muted-foreground">Practice in simulated exam environments</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search mock tests by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Mock Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMockTests.map((test) => {
            const scorePercentage = (test.lastScore / test.maxScore) * 100;
            return (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <ClipboardCheck className="w-8 h-8 text-primary" />
                    <Badge variant="secondary">{test.format}</Badge>
                  </div>
                  <CardTitle className="text-xl">{test.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{test.subject}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{test.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Target className="w-4 h-4 mr-2" />
                        <span>{test.sections} sections</span>
                      </div>
                    </div>

                    {test.lastScore && (
                      <div className="pt-4 border-t space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Last Score</span>
                          <span className="text-lg font-bold text-primary">
                            {test.lastScore}/{test.maxScore}
                          </span>
                        </div>
                        <Progress value={scorePercentage} />
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        onClick={() => handleStartPractice(test.name)}
                      >
                        Practice Mode
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleTimedMode(test.name)}
                      >
                        Timed Mode
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mock Test Schedule */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Mock Tests</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { date: "Nov 15, 2025", test: "SAT Practice Test", time: "9:00 AM" },
                  { date: "Nov 20, 2025", test: "GRE Mock Exam", time: "2:00 PM" },
                  { date: "Nov 25, 2025", test: "GMAT Practice Test", time: "10:00 AM" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/30"
                  >
                    <div>
                      <p className="font-medium">{item.test}</p>
                      <p className="text-sm text-muted-foreground">{item.date} at {item.time}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Set Reminder
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default MockTests;
