import { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Check, Info, Ticket } from "lucide-react";
import { API_KEY_TMDB } from "@/lib/config";

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdrop_path?: string;
  rating?: number;
  runtime?: number;
}

interface BookingLocationState {
  movie: Movie;
  selectedShowtime?: string;
}

interface Seat {
  id: string;
  row: string;
  number: number;
  type: "available" | "selected" | "reserved";
}

const seatTypes = {
  available:
    "bg-cinema-dark border-gray-600 hover:bg-accent hover:border-white",
  selected: "bg-cinema-red border-cinema-red hover:bg-cinema-red/90",
  reserved: "bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed",
};

const generateSeats = (): Seat[] => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 10;
  const seats: Seat[] = [];

  for (const row of rows) {
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      const seatId = `${row}${seatNum}`;
      const isReserved = Math.random() < 0.2; // 20% chance of being reserved
      seats.push({
        id: seatId,
        row,
        number: seatNum,
        type: isReserved ? "reserved" : "available",
      });
    }
  }

  return seats;
};

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const showtime = searchParams.get("time");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state } = useLocation() as { state: BookingLocationState };
  const price = 300;

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const [movie, setMovie] = useState<Movie | null>(
    state?.movie ||
      JSON.parse(localStorage.getItem("currentBooking") || "null")?.movie
  );

  useEffect(() => {
    // Check authentication
    console.log("Checking authentication...", id);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", {
        state: {
          from: `/movies/${id}/book`,
          message: "Please login to continue booking",
        },
        replace: true,
      });
      toast({
        title: "Authentication Required",
        description: "You need to login to book tickets",
        variant: "destructive",
      });
      return;
    }

    // Check if coming from proper flow (has movie data)
    // if (!movie && id) {
    //   // Fetch movie details if not already available
    //   const fetchMovie = async (movieId: string) => {
    //     try {
    //       const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    //       const options = {
    //         method: "GET",
    //         headers: {
    //           accept: "application/json",
    //           Authorization: `Bearer ${API_KEY_TMDB}`,
    //         },
    //       };

    //       fetch(url, options)
    //         .then((res) => res.json())
    //         .then((json) => console.log(json));
    //     } catch (error) {
    //       console.error("Failed to fetch movie:", error);
    //       toast({
    //         title: "Error",
    //         description: "Failed to load movie details",
    //         variant: "destructive",
    //       });
    //       navigate("/", { replace: true });
    //     }
    //   };
    //   fetchMovie(id);
    //   // .then((data) => {
    //   //   console.log("Fetched movie data:", data);
    //   //   data.setMovie(data);
    //   //   localStorage.setItem(
    //   //     "currentBooking",
    //   //     JSON.stringify({
    //   //       movie: data,
    //   //       showtime: searchParams.get("time"),
    //   //     })
    //   // );
    //   // });
    // }

    const showtime = searchParams.get("time");
    const movieData =
      state?.movie ||
      JSON.parse(localStorage.getItem("currentBooking") || "null");

    if (!movieData || !showtime) {
      // If we're missing critical data but have an ID, redirect to movie page
      if (id) {
        navigate(`/movies/${id}`, { replace: true });
        toast({
          title: "Complete your booking",
          description: "Please select a showtime first",
          variant: "destructive",
        });
      } else {
        // If we don't even have a movie ID, go home
        navigate("/", { replace: true });
      }
      return;
    }

    localStorage.setItem(
      "currentBooking",
      JSON.stringify({ movie: movieData, showtime })
    );
    setIsValid(true);

    setIsLoading(false);
  }, [id, state, searchParams, navigate, toast]);

  // Initialize seats
  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  const handleSeatClick = (seatId: string, currentType: Seat["type"]) => {
    if (currentType === "reserved") return;

    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId
          ? {
              ...seat,
              type: seat.type === "available" ? "selected" : "available",
            }
          : seat
      )
    );

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        if (prev.length >= 10) {
          toast({
            title: "Maximum seats reached",
            description: "You can select up to 10 seats.",
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  const handleConfirmBooking = () => {
    if (!state?.movie || !showtime || selectedSeats.length === 0) return;

    const booking = {
      movie: state.movie,
      showtime,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * price,
      bookingDate: new Date().toISOString(),
    };

    // Save to localStorage (in a real app, send to backend)
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...bookings, booking]));

    // Clear current booking from localStorage
    localStorage.removeItem("currentBooking");

    toast({
      title: "Booking confirmed!",
      description: `Enjoy ${state.movie.title} at ${showtime}`,
    });

    navigate("/dashboard", { state: booking });
  };

  const seatsByRow = seats.reduce<Record<string, Seat[]>>((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const totalPrice = selectedSeats.length * price;

  if (isLoading || !state?.movie || !showtime) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-4xl font-bold text-cinema-red">
            Loading booking information...
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-cinema-dark py-8">
        <div className="container">
          <h1 className="mb-2 text-3xl font-bold text-white">
            {state.movie.title}
          </h1>
          <p className="mb-8 text-gray-300">{showtime} • Select your seats</p>

          <Alert className="mb-8 border-cinema-gold/30 bg-cinema-gold/10 text-cinema-gold">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please select between 1 and 10 seats. Click on a seat to select or
              deselect it.
            </AlertDescription>
          </Alert>

          {/* Screen */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-2 h-2 w-4/5 rounded-lg bg-cinema-red/80"></div>
            <div className="mx-auto mb-8 h-8 w-3/4 rounded-t-3xl border-t border-l border-r border-gray-600 bg-cinema-dark shadow-[0_-15px_40px_-15px_rgba(220,38,38,0.3)]"></div>
            <p className="text-sm text-gray-400">SCREEN</p>
          </div>

          {/* Seat Legend */}
          <div className="mb-8 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div
                className={`h-5 w-5 rounded border ${seatTypes.available}`}
              ></div>
              <span className="text-sm text-gray-300">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`h-5 w-5 rounded border ${seatTypes.selected}`}
              ></div>
              <span className="text-sm text-gray-300">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`h-5 w-5 rounded border ${seatTypes.reserved}`}
              ></div>
              <span className="text-sm text-gray-300">Reserved</span>
            </div>
          </div>

          {/* Seats Grid */}
          <div className="mb-12 overflow-auto">
            <div className="mx-auto max-w-3xl">
              {Object.entries(seatsByRow).map(([row, rowSeats]) => (
                <div key={row} className="mb-4 flex items-center gap-3">
                  <div className="w-6 text-center text-sm font-semibold text-gray-400">
                    {row}
                  </div>
                  <div className="flex flex-1 flex-wrap justify-center gap-2">
                    {rowSeats.map((seat) => (
                      <button
                        key={seat.id}
                        className={`flex h-8 w-8 items-center justify-center rounded border text-xs font-medium transition-all ${
                          seatTypes[seat.type]
                        }`}
                        onClick={() => handleSeatClick(seat.id, seat.type)}
                        disabled={seat.type === "reserved"}
                        aria-label={`Seat ${seat.id} - ${seat.type}`}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                  <div className="w-6 text-center text-sm font-semibold text-gray-400">
                    {row}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="mx-auto max-w-md rounded-lg border border-gray-700 bg-cinema-darker p-6">
            <h3 className="mb-4 text-xl font-bold text-white">
              Booking Summary
            </h3>

            <div className="mb-4 flex justify-between border-b border-gray-700 pb-4">
              <span className="text-gray-300">Selected Seats</span>
              <span className="font-medium text-white">
                {selectedSeats.length > 0
                  ? selectedSeats.sort().join(", ")
                  : "None selected"}
              </span>
            </div>

            <div className="mb-6 flex justify-between border-b border-gray-700 pb-4">
              <span className="text-gray-300">
                Price ({selectedSeats.length} × ₹{price})
              </span>
              <span className="font-medium text-white">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              className="w-full gap-2 bg-cinema-red hover:bg-cinema-red/90"
              disabled={selectedSeats.length === 0}
              onClick={() => setIsConfirmDialogOpen(true)}
            >
              <Ticket className="h-4 w-4" />
              {selectedSeats.length === 0
                ? "Select seats to continue"
                : "Proceed to Payment"}
            </Button>

            {selectedSeats.length === 0 && (
              <Alert className="mt-4 border-red-700/30 bg-red-900/10 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please select at least one seat to continue.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm your booking</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-start gap-4">
              <img
                src={state.movie.posterUrl}
                alt={state.movie.title}
                className="h-20 w-16 rounded object-cover"
              />
              <div>
                <h4 className="font-semibold">{state.movie.title}</h4>
                <p className="text-sm text-gray-400">{showtime}</p>
                <p className="text-sm text-gray-400">
                  {selectedSeats.length} seat(s):{" "}
                  {selectedSeats.sort().join(", ")}
                </p>
              </div>
            </div>

            <div className="rounded-md bg-muted p-4">
              <p className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-400">Total:</span>
                <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
              </p>
              <p className="text-xs text-gray-400">
                By confirming, you agree to our terms and conditions.
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="gap-2 bg-cinema-red hover:bg-cinema-red/90"
              onClick={handleConfirmBooking}
            >
              <Check className="h-4 w-4" /> Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
