
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageSEO from '@/components/SEO/PageSEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageSEO
        title="Page Not Found"
        description="Sorry, the page you are looking for does not exist. Please navigate back to our homepage."
        keywords="404, not found, error page, missing page"
      />
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="text-center px-6 max-w-xl mx-auto">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 font-bold text-3xl">
            404
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
            
            <Button variant="outline" asChild size="lg">
              <Link to="/teams">View Teams</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
