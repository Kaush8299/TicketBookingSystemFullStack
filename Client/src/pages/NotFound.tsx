import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout hideFooter>
      <div className="container flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 text-9xl font-bold text-cinema-red">404</div>
        <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          Page Not Found
        </h1>
        <p className="mb-8 max-w-md text-xl text-gray-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-cinema-red hover:bg-cinema-red/90"
        >
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
