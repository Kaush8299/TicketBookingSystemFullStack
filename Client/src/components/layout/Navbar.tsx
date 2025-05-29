import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isToken = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-cinema-darker/90 py-2 shadow-lg backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-cinema-red">
            CINE<span className="text-cinema-gold">TICKET</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "text-cinema-gold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Home
          </Link>
          {/*<Link
            to="/movies"
            className={`text-sm font-medium transition-colors ${
              location.pathname.includes("/movies")
                ? "text-cinema-gold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Movies
          </Link>
          <Link
            to="/upcoming"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/upcoming"
                ? "text-cinema-gold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Coming Soon
          </Link> 
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </Button> */}
        </div>

        <div className="flex items-center gap-2">
          {!isToken && (
            <Link to="/signin">
              <Button
                variant="ghost"
                className="text-sm text-gray-300 hover:text-white"
              >
                Sign In
              </Button>
            </Link>
          )}
          {!isToken && (
            <Link to="/signup">
              <Button className="bg-cinema-red text-sm hover:bg-cinema-red/90">
                Sign Up
              </Button>
            </Link>
          )}
          {isToken && (
            <Link to="/dashboard">
              <Button className="bg-cinema-red text-sm hover:bg-cinema-red/90">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
