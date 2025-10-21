import { useState } from "react";
import LMSNavigation from "@/components/LMSNavigation";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Video, Calendar, Users, Clock } from "lucide-react";
import { toast } from "sonner";

const Webinars = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const upcomingWebinars = [
    {
      id: 1,
      title: "Future of AI in Education",
      presenter: "Dr. Sarah Johnson",
      presenterInitials: "SJ",
      date: "Nov 20, 2025",
      time: "3:00 PM EST",
      duration: "1.5 hours",
      attendees: 245,
      topic: "Artificial Intelligence",
    },
    {
      id: 2,
      title: "Modern Web Development Trends",
      presenter: "Prof. Michael Chen",
      presenterInitials: "MC",
      date: "Nov 22, 2025",
      time: "2:00 PM EST",
      duration: "2 hours",
      attendees: 189,
      topic: "Web Development",
    },
    {
      id: 3,
      title: "Data Science for Beginners",
      presenter: "Dr. Emily Davis",
      presenterInitials: "ED",
      date: "Nov 25, 2025",
      time: "4:00 PM EST",
      duration: "1 hour",
      attendees: 312,
      topic: "Data Science",
    },
  ];

  const recordedWebinars = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      presenter: "Dr. Sarah Johnson",
      presenterInitials: "SJ",
      date: "Oct 15, 2025",
      views: 1240,
      duration: "1.5 hours",
      topic: "Machine Learning",
    },
    {
      id: 2,
      title: "React Best Practices 2025",
      presenter: "Prof. Michael Chen",
      presenterInitials: "MC",
      date: "Oct 18, 2025",
      views: 987,
      duration: "2 hours",
      topic: "Web Development",
    },
    {
      id: 3,
      title: "Career Growth in Tech",
      presenter: "John Smith",
      presenterInitials: "JS",
      date: "Oct 20, 2025",
      views: 1456,
      duration: "1 hour",
      topic: "Career Development",
    },
  ];

  const handleRegister = (webinarTitle: string) => {
    toast.success(`Registered for "${webinarTitle}"`);
  };

  const handleWatch = (webinarTitle: string) => {
    toast.info(`Playing "${webinarTitle}"`);
  };

  const filteredUpcoming = upcomingWebinars.filter((webinar) =>
    webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    webinar.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    webinar.presenter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecorded = recordedWebinars.filter((webinar) =>
    webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    webinar.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    webinar.presenter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <LMSNavigation userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Webinars</h1>
          <p className="text-muted-foreground">Join live sessions or watch recorded webinars</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search webinars by title, topic, or presenter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Upcoming Webinars */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcoming.map((webinar) => (
              <Card key={webinar.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-accent rounded-md mb-3 flex items-center justify-center">
                    <Video className="w-16 h-16 text-accent-foreground" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{webinar.topic}</Badge>
                    <Badge variant="outline">Live</Badge>
                  </div>
                  <CardTitle className="text-lg">{webinar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {webinar.presenterInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{webinar.presenter}</span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{webinar.date} at {webinar.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{webinar.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{webinar.attendees} registered</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleRegister(webinar.title)}
                    >
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recorded Webinars */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recorded Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecorded.map((webinar) => (
              <Card key={webinar.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-accent rounded-md mb-3 flex items-center justify-center relative">
                    <Video className="w-16 h-16 text-accent-foreground" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {webinar.duration}
                    </div>
                  </div>
                  <Badge className="mb-2 w-fit">{webinar.topic}</Badge>
                  <CardTitle className="text-lg">{webinar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {webinar.presenterInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{webinar.presenter}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{webinar.date}</span>
                      </div>
                      <span>{webinar.views} views</span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleWatch(webinar.title)}
                    >
                      Watch Now
                    </Button>
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

export default Webinars;
