import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, Ticket } from "lucide-react";
import axios from "axios";
import { API_KEY_TMDB } from "@/lib/config";
import { toast } from "sonner";

// This is mock data - in a real app, you would fetch this from an API
// const movieData = {
//   "1": {
//     id: "1",
//     title: "Inception",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
//     backdropUrl:
//       "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
//     rating: 8.8,
//     runtime: 148,
//     releaseDate: "2010-07-16",
//     director: "Christopher Nolan",
//     cast: [
//       "Leonardo DiCaprio",
//       "Joseph Gordon-Levitt",
//       "Elliot Page",
//       "Tom Hardy",
//       "Ken Watanabe",
//     ],
//     genres: ["Sci-Fi", "Action", "Thriller"],
//     description:
//       "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
//   },
//   "2": {
//     id: "2",
//     title: "The Dark Knight",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
//     backdropUrl:
//       "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
//     rating: 9.0,
//     runtime: 152,
//     releaseDate: "2008-07-18",
//     director: "Christopher Nolan",
//     cast: [
//       "Christian Bale",
//       "Heath Ledger",
//       "Aaron Eckhart",
//       "Michael Caine",
//       "Gary Oldman",
//     ],
//     genres: ["Action", "Crime", "Drama"],
//     description:
//       "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
//     showtimes: ["11:00 AM", "2:00 PM", "5:15 PM", "8:30 PM", "11:30 PM"],
//   },
//   // More movies would be defined here in a real application
// };

export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const currentMovie = state?.movie;
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [movieCast, setMovieCast] = useState([]);
  const [director, setDirector] = useState<string | null>(null);
  const showtimes = ["10:30 AM", "1:15 PM", "4:00 PM", "7:30 PM", "10:45 PM"];

  // If the movie ID doesn't exist, show an error message

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY_TMDB}`,
      },
    };

    axios
      .request(options)
      .then((res) => {
        const directed_by = res.data.crew.find(
          (member: { department: string }) => member.department === "Directing"
        )?.name;
        setDirector(directed_by || "Unknown Director");
        const actors = res.data.cast
          .slice(0, 4)
          .map((actor: { name: unknown }) => ({
            name: actor.name,
          }));

        setMovieCast(actors.map((actor: { name: unknown }) => actor.name));
      })
      .catch((err) => console.error(err));
  }, []);

  if (!id) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-4xl font-bold text-cinema-red">
            Movie Not Found
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            The movie you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // const movie = movieData[id as keyof typeof movieData];

  const handleShowtimeSelect = (time: string) => {
    setSelectedShowtime(time);
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative min-h-[60vh]">
        <div className="absolute inset-0">
          {currentMovie.backdrop_path && (
            <img
              src={currentMovie.backdrop_path}
              alt={`${currentMovie.title} backdrop`}
              className="h-full w-full object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/80 to-transparent"></div>
        </div>

        <div className="container relative z-10 flex min-h-[60vh] flex-col justify-end pb-12 pt-32">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="h-auto w-64 flex-shrink-0 overflow-hidden rounded-lg shadow-2xl">
              <img
                src={currentMovie.posterUrl}
                alt={`${currentMovie.title} poster`}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
                {currentMovie.title}
              </h1>

              {/* <div className="mb-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge
                    key={genre}
                    className="bg-cinema-red/20 text-white hover:bg-cinema-red/30"
                  >
                    {genre}
                  </Badge>
                ))}
              </div> */}

              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                {/*  <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div> */}
                {/*<div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    148 min
                     {movie.runtime}  
                   </span>
                </div>   */}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {currentMovie.release_date ||
                      new Date(currentMovie.releaseDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}
                  </span>
                </div>
              </div>

              <p className="mb-6 max-w-2xl text-white/80">
                {currentMovie.description}
              </p>

              <div className="mb-2">
                <p className="font-semibold text-white">Director</p>
                <p className="text-gray-300">{director}</p>
              </div>

              <div>
                <p className="font-semibold text-white">Cast</p>
                <p className="text-gray-300">{movieCast.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      {!currentMovie.isUpcoming && (
        <section className="bg-cinema-darker py-12">
          <div className="container">
            <h2 className="section-heading mb-8 pl-4">Today's Showtimes</h2>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {showtimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedShowtime === time ? "default" : "outline"}
                  className={`h-14 text-base ${
                    selectedShowtime === time
                      ? "bg-cinema-red hover:bg-cinema-red/90"
                      : "border-gray-700 bg-cinema-dark text-white hover:bg-cinema-dark/80"
                  }`}
                  onClick={() => handleShowtimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-cinema-red hover:bg-cinema-red/90"
                disabled={!selectedShowtime}
                onClick={(e) => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    e.preventDefault(); // Prevent navigation
                    // Show login prompt or redirect to login
                    navigate("/signin", {
                      state: {
                        from: `/movies/${id}`,
                        message: "Please login to book tickets",
                      },
                    });
                    toast.error("Please login to book tickets");
                  }
                }}
              >
                <Link
                  to={`/movies/${id}/book?time=${selectedShowtime}`}
                  state={{
                    movie: currentMovie,
                    from: `/movies/${id}`,
                  }}
                >
                  <Ticket className="h-4 w-4" />
                  Book Tickets
                </Link>
                {/* <Link
                  to={
                    selectedShowtime
                      ? `/movies/${id}/book?time=${encodeURIComponent(
                          selectedShowtime
                        )}`
                      : "#"
                  }
                  state={{
                    movie: currentMovie,
                  }}
                >
                  <Ticket className="h-4 w-4" />
                  Book Tickets
                </Link>*/}
              </Button>

              {!selectedShowtime && (
                <p className="mt-2 text-sm text-gray-400">
                  Please select a showtime to continue
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
