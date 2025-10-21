import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Books from "./pages/Books";
import Courses from "./pages/Courses";
import Tests from "./pages/Tests";
import Quizzes from "./pages/Quizzes";
import MockTests from "./pages/MockTests";
import Notes from "./pages/Notes";
import Mentorship from "./pages/Mentorship";
import Webinars from "./pages/Webinars";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/books" element={<Books />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/mock-tests" element={<MockTests />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/webinars" element={<Webinars />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
