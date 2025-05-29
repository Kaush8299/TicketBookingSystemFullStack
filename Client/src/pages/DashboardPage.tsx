import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Ticket as TicketIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

interface Ticket {
  id: string;
  movieTitle: string;
  posterUrl: string;
  date: string;
  time: string;
  theater: string;
  seats: string[];
  price: number;
  isPast: boolean;
}

export default function DashboardPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    // Load tickets from localStorage or use default ones
    const savedTickets = localStorage.getItem("tickets");
    return savedTickets
      ? JSON.parse(savedTickets)
      : [
          {
            id: "t1",
            movieTitle: "Inception",
            posterUrl:
              "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            date: "2024-04-15",
            time: "19:30",
            theater: "CineTicket IMAX - Screen 1",
            seats: ["F5", "F6"],
            price: 32.98,
            isPast: false,
          },
          {
            id: "t2",
            movieTitle: "The Dark Knight",
            posterUrl:
              "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            date: "2024-04-20",
            time: "20:00",
            theater: "CineTicket Premium - Screen 3",
            seats: ["D12", "D13", "D14"],
            price: 47.97,
            isPast: false,
          },
          {
            id: "t3",
            movieTitle: "Pulp Fiction",
            posterUrl:
              "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            date: "2024-03-10",
            time: "18:45",
            theater: "CineTicket Standard - Screen 5",
            seats: ["H8"],
            price: 12.99,
            isPast: true,
          },
        ];
  });

  // Handle new ticket from booking
  useEffect(() => {
    if (state?.movie && state?.showtime && state?.seats) {
      const newTicket: Ticket = {
        id: `t${Date.now()}`,
        movieTitle: state.movie.title,
        posterUrl: state.movie.posterUrl,
        date: new Date().toISOString().split("T")[0],
        time: state.showtime,
        theater: "CineTicket Standard - Screen 1",
        seats: state.seats,
        price: state.seats.length * 300,
        isPast: false,
      };

      const updatedTickets = [...tickets, newTicket];
      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      // Clear navigation state
      navigate(".", { state: {}, replace: true });

      toast({
        title: "Booking Confirmed!",
        description: `Your tickets for ${state.movie.title} have been added.`,
      });
    }
  }, [state, navigate, toast, tickets]);

  const upcomingTickets = tickets.filter((ticket) => !ticket.isPast);
  const pastTickets = tickets.filter((ticket) => ticket.isPast);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const markTicketAsPast = (ticketId: string) => {
    setTickets((prevTickets) => {
      const updated = prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, isPast: true } : ticket
      );
      localStorage.setItem("tickets", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Layout>
      <div className="container py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Your Tickets
          </h1>
          <p className="mt-2 text-gray-400">
            Manage your movie bookings and past visits
          </p>
        </div>

        <Tabs
          defaultValue="upcoming"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="mb-6">
            <TabsList className="bg-muted">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-cinema-red data-[state=active]:text-white"
              >
                Upcoming ({upcomingTickets.length})
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-cinema-red data-[state=active]:text-white"
              >
                Past ({pastTickets.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="mt-0">
            {upcomingTickets.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {upcomingTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="overflow-hidden bg-card border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="h-48 w-full md:h-auto md:w-1/3">
                        <img
                          src={ticket.posterUrl}
                          alt={ticket.movieTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <CardHeader className="p-0 pb-3">
                          <CardTitle className="text-xl text-white">
                            {ticket.movieTitle}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 text-cinema-gold">
                            <TicketIcon className="h-3 w-3" />
                            Booking #{ticket.id}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 text-gray-300">
                          <div className="mb-6 mt-4 space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <CalendarIcon className="mt-0.5 h-4 w-4 text-gray-400" />
                              <div>
                                <span className="block text-white">
                                  {formatDate(ticket.date)}
                                </span>
                                <span className="text-gray-400">
                                  {ticket.time}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                              <span>{ticket.theater}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5 text-gray-400">Seats:</div>
                              <div className="flex flex-wrap gap-1">
                                {ticket.seats.map((seat) => (
                                  <span
                                    key={seat}
                                    className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-white"
                                  >
                                    {seat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                            <div>
                              <span className="block text-xs text-gray-400">
                                Total paid
                              </span>
                              <span className="text-lg font-bold text-white">
                                ₹{ticket.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="border-gray-700 bg-muted/80 hover:bg-muted"
                                onClick={() => markTicketAsPast(ticket.id)}
                              >
                                Mark as Watched
                              </Button>
                              <Button
                                variant="outline"
                                className="border-cinema-gold/30 bg-cinema-gold/10 text-cinema-gold hover:bg-cinema-gold/20 hover:text-cinema-gold"
                              >
                                View Ticket
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <TicketIcon className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-white">
                  No upcoming tickets
                </h3>
                <p className="mb-6 text-gray-400">
                  You have no upcoming movie bookings.
                </p>
                <Button
                  asChild
                  className="bg-cinema-red hover:bg-cinema-red/90"
                >
                  <Link to="/">Browse Movies</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            {pastTickets.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {pastTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="overflow-hidden bg-card border-gray-700"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="h-48 w-full md:h-auto md:w-1/3">
                        <img
                          src={ticket.posterUrl}
                          alt={ticket.movieTitle}
                          className="h-full w-full object-cover opacity-80 grayscale-[30%]"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <CardHeader className="p-0 pb-3">
                          <CardTitle className="text-xl text-white">
                            {ticket.movieTitle}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 text-gray-400">
                            <Clock className="h-3 w-3" />
                            Past visit
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 text-gray-300">
                          <div className="mb-6 mt-4 space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <CalendarIcon className="mt-0.5 h-4 w-4 text-gray-400" />
                              <div>
                                <span className="block text-white">
                                  {formatDate(ticket.date)}
                                </span>
                                <span className="text-gray-400">
                                  {ticket.time}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                              <span>{ticket.theater}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5 text-gray-400">Seats:</div>
                              <div className="flex flex-wrap gap-1">
                                {ticket.seats.map((seat) => (
                                  <span
                                    key={seat}
                                    className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-white"
                                  >
                                    {seat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                            <div>
                              <span className="block text-xs text-gray-400">
                                Total paid
                              </span>
                              <span className="text-lg font-bold text-white">
                                ₹{ticket.price.toFixed(2)}
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              className="border-gray-700 bg-muted/80 hover:bg-muted"
                            >
                              Rate Movie
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-white">
                  No past tickets
                </h3>
                <p className="text-gray-400">
                  Your movie history will appear here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
