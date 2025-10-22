import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Play, Lock, CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";

interface Topic {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  description: string;
  locked: boolean;
  completed: boolean;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CourseData {
  courseTitle: string;
  moduleName: string;
  videoUrl: string;
  posterUrl: string;
  topics: Topic[];
  examQuestions: Question[];
}

const sampleCourseData: CourseData = {
  courseTitle: "Advanced Python Programming",
  moduleName: "Module 1: Python Fundamentals",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  posterUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop",
  topics: [
    {
      id: "1",
      title: "Introduction to Python",
      startTime: 0,
      endTime: 30,
      description: "Learn the basics of Python programming language",
      locked: false,
      completed: false,
    },
    {
      id: "2",
      title: "Variables and Data Types",
      startTime: 30,
      endTime: 60,
      description: "Understanding Python variables and data types",
      locked: false,
      completed: false,
    },
    {
      id: "3",
      title: "Control Flow",
      startTime: 60,
      endTime: 90,
      description: "If statements, loops, and conditions",
      locked: false,
      completed: false,
    },
    {
      id: "4",
      title: "Functions",
      startTime: 90,
      endTime: 120,
      description: "Creating and using functions in Python",
      locked: false,
      completed: false,
    },
  ],
  examQuestions: [
    {
      id: "1",
      question: "What is Python?",
      options: ["A snake", "A programming language", "A database", "An operating system"],
      correctAnswer: 1,
    },
    {
      id: "2",
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "define", "def", "function"],
      correctAnswer: 2,
    },
  ],
};

export const CourseVideoPlayer = () => {
  const [courseData, setCourseData] = useState<CourseData>(sampleCourseData);
  const [currentTopic, setCurrentTopic] = useState<Topic>(courseData.topics[0]);
  const [notes, setNotes] = useState("");
  const [showExam, setShowExam] = useState(false);
  const [examAnswers, setExamAnswers] = useState<{ [key: string]: number }>({});
  const [examScore, setExamScore] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const progress = (courseData.topics.filter((t) => t.completed).length / courseData.topics.length) * 100;
  const allTopicsCompleted = courseData.topics.every((t) => t.completed);

  useEffect(() => {
    const savedProgress = localStorage.getItem("courseProgress");
    const savedNotes = localStorage.getItem("courseNotes");
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      setCourseData((prev) => ({
        ...prev,
        topics: prev.topics.map((topic) => ({
          ...topic,
          completed: progressData[topic.id] || false,
        })),
      }));
    }
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      const currentTime = videoRef.current.currentTime;
      
      if (currentTime >= currentTopic.endTime * 0.9) {
        markTopicComplete(currentTopic.id);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [currentTopic]);

  const markTopicComplete = (topicId: string) => {
    setCourseData((prev) => {
      const updatedTopics = prev.topics.map((topic) =>
        topic.id === topicId ? { ...topic, completed: true } : topic
      );
      
      const progressData: { [key: string]: boolean } = {};
      updatedTopics.forEach((topic) => {
        progressData[topic.id] = topic.completed;
      });
      localStorage.setItem("courseProgress", JSON.stringify(progressData));
      
      return { ...prev, topics: updatedTopics };
    });
  };

  const handleTopicClick = (topic: Topic) => {
    if (topic.locked) {
      toast.error("This topic is locked. Complete previous topics first.");
      return;
    }
    setCurrentTopic(topic);
    if (videoRef.current) {
      videoRef.current.currentTime = topic.startTime;
      videoRef.current.play();
    }
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    localStorage.setItem("courseNotes", value);
  };

  const handleExamSubmit = () => {
    let score = 0;
    courseData.examQuestions.forEach((question) => {
      if (examAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    const percentage = (score / courseData.examQuestions.length) * 100;
    setExamScore(percentage);
  };

  const resetExam = () => {
    setExamAnswers({});
    setExamScore(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{courseData.courseTitle}</CardTitle>
          <p className="text-sm text-muted-foreground">{courseData.moduleName}</p>
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% Complete</p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  controls
                  poster={courseData.posterUrl}
                >
                  <source src={courseData.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{currentTopic.title}</h3>
                <p className="text-sm text-muted-foreground">{currentTopic.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Topics List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Course Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {courseData.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic)}
                  disabled={topic.locked}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    currentTopic.id === topic.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  } ${topic.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{topic.title}</span>
                    {topic.locked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : topic.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.floor(topic.startTime / 60)}:{(topic.startTime % 60).toString().padStart(2, "0")} -{" "}
                    {Math.floor(topic.endTime / 60)}:{(topic.endTime % 60).toString().padStart(2, "0")}
                  </span>
                </button>
              ))}
              
              <Button
                onClick={() => setShowExam(true)}
                disabled={!allTopicsCompleted}
                className="w-full mt-4"
                variant={allTopicsCompleted ? "default" : "outline"}
              >
                {allTopicsCompleted ? "Take Exam" : "Complete All Topics to Unlock Exam"}
              </Button>
            </CardContent>
          </Card>

          {/* My Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">My Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your notes here..."
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                className="min-h-[150px] resize-none"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Exam Modal */}
      <Dialog open={showExam} onOpenChange={setShowExam}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Exam - {courseData.courseTitle}</DialogTitle>
          </DialogHeader>
          
          {examScore === null ? (
            <div className="space-y-6">
              {courseData.examQuestions.map((question, qIndex) => (
                <div key={question.id} className="space-y-3">
                  <p className="font-medium">
                    {qIndex + 1}. {question.question}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-accent"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={oIndex}
                          checked={examAnswers[question.id] === oIndex}
                          onChange={() =>
                            setExamAnswers((prev) => ({ ...prev, [question.id]: oIndex }))
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center space-y-4 py-8">
              <h3 className="text-2xl font-bold">Your Score: {examScore}%</h3>
              <p className="text-muted-foreground">
                You got {Math.round((examScore / 100) * courseData.examQuestions.length)} out of{" "}
                {courseData.examQuestions.length} questions correct.
              </p>
              {examScore >= 70 ? (
                <p className="text-green-600 font-medium">Congratulations! You passed the exam.</p>
              ) : (
                <p className="text-destructive font-medium">You need 70% to pass. Try again!</p>
              )}
            </div>
          )}
          
          <DialogFooter>
            {examScore === null ? (
              <Button
                onClick={handleExamSubmit}
                disabled={Object.keys(examAnswers).length !== courseData.examQuestions.length}
              >
                Submit Exam
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowExam(false)}>
                  Close
                </Button>
                <Button onClick={resetExam}>Retry Exam</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
