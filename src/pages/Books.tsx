import { useState } from "react";
import LMSNavigation from "@/components/LMSNavigation";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, BookOpen } from "lucide-react";
import { toast } from "sonner";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const books = [
    {
      id: 1,
      title: "Introduction to Physics",
      author: "Dr. John Smith",
      category: "Science",
      cover: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      author: "Prof. Sarah Johnson",
      category: "Math",
      cover: "/placeholder.svg",
    },
    {
      id: 3,
      title: "World History",
      author: "Dr. Michael Brown",
      category: "History",
      cover: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Chemistry Fundamentals",
      author: "Dr. Emily Davis",
      category: "Science",
      cover: "/placeholder.svg",
    },
    {
      id: 5,
      title: "English Literature",
      author: "Prof. James Wilson",
      category: "Literature",
      cover: "/placeholder.svg",
    },
    {
      id: 6,
      title: "Biology Essentials",
      author: "Dr. Lisa Anderson",
      category: "Science",
      cover: "/placeholder.svg",
    },
  ];

  const handleRead = (bookTitle: string) => {
    toast.success(`Opening "${bookTitle}"`);
  };

  const handleDownload = (bookTitle: string) => {
    toast.success(`Downloading "${bookTitle}"`);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <LMSNavigation userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Digital Library</h1>
          <p className="text-muted-foreground">Access e-books and PDFs for your courses</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search books by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Literature">Literature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recommended Books Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.slice(0, 4).map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-[3/4] bg-accent rounded-md mb-3 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <p className="text-xs text-primary mt-1">{book.category}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleRead(book.title)}
                  >
                    Read
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(book.title)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* All Books Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-[3/4] bg-accent rounded-md mb-3 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <p className="text-xs text-primary mt-1">{book.category}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleRead(book.title)}
                  >
                    Read
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(book.title)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
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

export default Books;
