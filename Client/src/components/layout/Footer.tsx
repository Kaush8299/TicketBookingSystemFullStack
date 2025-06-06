import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cinema-darker py-12">
      <div className="container">
        <div className="mb-8 flex flex-col items-center justify-center md:flex-row md:justify-between">
          <Link to="/" className="mb-6 flex items-center gap-2 md:mb-0">
            <span className="text-2xl font-black text-cinema-red">
              CINE<span className="text-cinema-gold">TICKET</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="rounded-full bg-muted p-2 text-gray-400 transition-colors hover:bg-muted/80 hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-muted p-2 text-gray-400 transition-colors hover:bg-muted/80 hover:text-white"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-muted p-2 text-gray-400 transition-colors hover:bg-muted/80 hover:text-white"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-muted p-2 text-gray-400 transition-colors hover:bg-muted/80 hover:text-white"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">
              Help
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">
              Cinemas
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  All Locations
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Experiences
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">
              Account
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signin" className="text-gray-300 hover:text-white">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white">
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white"
                >
                  My Tickets
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} CineTicket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
