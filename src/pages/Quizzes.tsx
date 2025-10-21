import { useState } from "react";
import LMSNavigation from "@/components/LMSNavigation";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, HelpCircle, Clock, Trophy } from "lucide-react";
import { toast } from "sonner";

const Quizzes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const quizzes = [
    {
      id: 1,
      title: "JavaScript Basics",
      topic: "Programming",
      questions: 10,
      time: "15 min",
      difficulty: "Easy",
      topScore: 95,
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      topic: "Web Development",
      questions: 15,
      time: "20 min",
      difficulty: "Medium",
      topScore: 88,
    },
    {
      id: 3,
      title: "Data Structures Quiz",
      topic: "Computer Science",
      questions: 20,
      time: "30 min",
      difficulty: "Hard",
      topScore: 92,
    },
    {
      id: 4,
      title: "CSS Flexbox & Grid",
      topic: "Web Design",
      questions: 12,
      time: "18 min",
      difficulty: "Medium",
      topScore: 100,
    },
    {
      id: 5,
      title: "Python Fundamentals",
      topic: "Programming",
      questions: 15,
      time: "20 min",
      difficulty: "Easy",
      topScore: 87,
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Alice Johnson", score: 98 },
    { rank: 2, name: "Bob Smith", score: 95 },
    { rank: 3, name: "Carol Davis", score: 92 },
    { rank: 4, name: "David Wilson", score: 90 },
    { rank: 5, name: "Eve Martinez", score: 88 },
  ];

  const handleStartQuiz = (quizTitle: string) => {
    toast.success(`Starting "${quizTitle}"`);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Hard":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LMSNavigation userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Quizzes</h1>
          <p className="text-muted-foreground">Quick assessments to reinforce your learning</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search quizzes by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quizzes */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Popular Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredQuizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <HelpCircle className="w-8 h-8 text-primary" />
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">{quiz.topic}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <HelpCircle className="w-4 h-4 mr-1" />
                          <span>{quiz.questions} questions</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{quiz.time}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">
                          Top Score: <span className="font-semibold text-primary">{quiz.topScore}%</span>
                        </p>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => handleStartQuiz(quiz.title)}
                      >
                        Start Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  <CardTitle>Top Performers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className="flex items-center justify-between p-3 rounded-lg bg-accent/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                          {entry.rank}
                        </div>
                        <span className="font-medium">{entry.name}</span>
                      </div>
                      <span className="font-semibold text-primary">{entry.score}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default Quizzes;
