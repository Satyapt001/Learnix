import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageNavigation from "@/components/PageNavigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <div className="flex justify-center">
          <PageNavigation />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
