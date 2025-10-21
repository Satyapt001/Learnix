import { useState } from "react";
import LMSNavigation from "@/components/LMSNavigation";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, StickyNote, Upload, Edit, Share2, Calendar } from "lucide-react";
import { toast } from "sonner";

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const notes = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      course: "Web Development",
      lecture: "Lecture 5",
      date: "2025-10-15",
      type: "personal",
      comments: 3,
    },
    {
      id: 2,
      title: "Data Structures - Arrays & Linked Lists",
      course: "Computer Science",
      lecture: "Lecture 3",
      date: "2025-10-12",
      type: "shared",
      comments: 7,
    },
    {
      id: 3,
      title: "Machine Learning Algorithms Overview",
      course: "AI/ML",
      lecture: "Lecture 8",
      date: "2025-10-18",
      type: "personal",
      comments: 0,
    },
    {
      id: 4,
      title: "Database Normalization",
      course: "Database Systems",
      lecture: "Lecture 6",
      date: "2025-10-10",
      type: "shared",
      comments: 5,
    },
    {
      id: 5,
      title: "Python Object-Oriented Programming",
      course: "Programming",
      lecture: "Lecture 4",
      date: "2025-10-20",
      type: "personal",
      comments: 2,
    },
  ];

  const handleEdit = (noteTitle: string) => {
    toast.info(`Editing "${noteTitle}"`);
  };

  const handleShare = (noteTitle: string) => {
    toast.success(`Sharing "${noteTitle}"`);
  };

  const handleUpload = () => {
    toast.success("Upload note functionality");
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.lecture.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentNotes = notes.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <LMSNavigation userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Notes</h1>
            <p className="text-muted-foreground">Organize and collaborate on your study materials</p>
          </div>
          <Button onClick={handleUpload}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Note
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search notes by title, course, or lecture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Recently Added */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recently Added</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <StickyNote className="w-8 h-8 text-primary" />
                    <Badge variant={note.type === "shared" ? "default" : "secondary"}>
                      {note.type === "shared" ? "Shared" : "Personal"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{note.course}</p>
                    <p className="text-sm text-muted-foreground">{note.lecture}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{note.date}</span>
                    </div>
                    {note.comments > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {note.comments} comment{note.comments !== 1 ? "s" : ""}
                      </p>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEdit(note.title)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleShare(note.title)}
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Notes */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Notes</h2>
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <StickyNote className="w-6 h-6 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{note.title}</h3>
                          <Badge variant={note.type === "shared" ? "default" : "secondary"} className="text-xs">
                            {note.type === "shared" ? "Shared" : "Personal"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{note.course}</span>
                          <span>•</span>
                          <span>{note.lecture}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{note.date}</span>
                          </div>
                          {note.comments > 0 && (
                            <>
                              <span>•</span>
                              <span>{note.comments} comments</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(note.title)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(note.title)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
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

export default Notes;
