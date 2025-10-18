import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

interface PageNavigationProps {
  variant?: "default" | "light";
}

const PageNavigation = ({ variant = "default" }: PageNavigationProps) => {
  const navigate = useNavigate();

  const buttonVariant = variant === "light" ? "ghost" : "outline";
  const textClass = variant === "light" ? "text-white hover:text-white/80" : "";

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={buttonVariant}
        size="sm"
        onClick={() => navigate(-1)}
        className={textClass}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <Button
        variant={buttonVariant}
        size="sm"
        onClick={() => navigate("/")}
        className={textClass}
      >
        <Home className="w-4 h-4 mr-2" />
        Home
      </Button>
    </div>
  );
};

export default PageNavigation;
