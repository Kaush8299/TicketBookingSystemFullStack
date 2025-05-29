import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import DashboardPage from "@/pages/DashboardPage";
import MovieDetailsPage from "@/pages/MovieDetailsPage";
import BookingPage from "@/pages/BookingPage";
import NotFound from "@/pages/NotFound";
import AdminSignInPage from "./pages/admin/AdminSignInPage";
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import Theaters from "./pages/admin/Theaters";
import Screenings from "./pages/admin/Screenings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signin_admin" element={<AdminSignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/movies" element={<Movies />} />
          <Route path="/admin/theaters" element={<Theaters />} />
          <Route path="/admin/screenings" element={<Screenings />} />

          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/movies/:id/book" element={<BookingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
