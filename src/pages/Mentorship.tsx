import { useState } from "react";
import LMSNavigation from "@/components/LMSNavigation";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, Star, Calendar, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Mentorship = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      expertise: "Machine Learning & AI",
      rating: 4.9,
      sessions: 150,
      availability: "Available",
      initials: "SJ",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      expertise: "Web Development",
      rating: 4.8,
      sessions: 200,
      availability: "Available",
      initials: "MC",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      expertise: "Data Science",
      rating: 5.0,
      sessions: 180,
      availability: "Busy",
      initials: "ED",
    },
    {
      id: 4,
      name: "John Smith",
      expertise: "Mobile Development",
      rating: 4.7,
      sessions: 120,
      availability: "Available",
      initials: "JS",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Dr. Sarah Johnson",
      topic: "Deep Learning Concepts",
      date: "Nov 15, 2025",
      time: "2:00 PM",
    },
    {
      id: 2,
      mentor: "Prof. Michael Chen",
      topic: "React Advanced Patterns",
      date: "Nov 18, 2025",
      time: "4:00 PM",
    },
  ];

  const handleBookSession = (mentorName: string) => {
    toast.success(`Booking session with ${mentorName}`);
  };

  const handleMessage = (mentorName: string) => {
    toast.info(`Opening chat with ${mentorName}`);
  };

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <LMSNavigation userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">One-on-One Mentorship</h1>
          <p className="text-muted-foreground">Connect with expert mentors for personalized guidance</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search mentors by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mentors List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Top Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {mentor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{mentor.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{mentor.expertise}</p>
                      </div>
                      <Badge variant={mentor.availability === "Available" ? "default" : "secondary"}>
                        {mentor.availability}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                          <span className="font-medium">{mentor.rating}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{mentor.sessions} sessions</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          size="sm"
                          onClick={() => handleBookSession(mentor.name)}
                          disabled={mentor.availability !== "Available"}
                        >
                          Book Session
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMessage(mentor.name)}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 rounded-lg bg-accent/30 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{session.topic}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            with {session.mentor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{session.date} at {session.time}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        Join Session
                      </Button>
                    </div>
                  ))}
                  {upcomingSessions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No upcoming sessions</p>
                      <p className="text-sm">Book a mentor to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Session History */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Recent Sessions</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { mentor: "Dr. Sarah Johnson", date: "Nov 10, 2025", rating: 5 },
                      { mentor: "Prof. Michael Chen", date: "Nov 8, 2025", rating: 5 },
                      { mentor: "Dr. Emily Davis", date: "Nov 5, 2025", rating: 4 },
                    ].map((session, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border"
                      >
                        <p className="font-medium text-sm">{session.mentor}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{session.date}</span>
                          <div className="flex items-center">
                            {Array.from({ length: session.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

export default Mentorship;
