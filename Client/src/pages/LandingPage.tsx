import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SearchIcon, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { MovieCard } from "@/components/ui/movie-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY_TMDB } from "@/lib/config";

// const currentMovies = [
//   {
//     id: "1",
//     title: "Inception",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
//     rating: 8.8,
//     runtime: 148,
//   },
//   {
//     id: "2",
//     title: "The Dark Knight",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
//     rating: 9.0,
//     runtime: 152,
//   },
//   {
//     id: "3",
//     title: "Interstellar",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
//     rating: 8.6,
//     runtime: 169,
//   },
//   {
//     id: "4",
//     title: "Pulp Fiction",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
//     rating: 8.9,
//     runtime: 154,
//   },
//   {
//     id: "5",
//     title: "The Matrix",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
//     rating: 8.7,
//     runtime: 136,
//   },
//   {
//     id: "6",
//     title: "Gladiator",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/ehGpN04mLJIrSnxcZBMvHeG0eDc.jpg",
//     rating: 8.5,
//     runtime: 155,
//   },
//   {
//     id: "7",
//     title: "Fight Club",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
//     rating: 8.8,
//     runtime: 139,
//   },
// ];

// const upcomingMovies = [
//   {
//     id: "8",
//     title: "Dune: Part Two",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
//     rating: 8.5,
//     releaseDate: "2024-05-15",
//   },
//   {
//     id: "9",
//     title: "Black Widow",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
//     rating: 7.8,
//     releaseDate: "2024-06-10",
//   },
//   {
//     id: "10",
//     title: "No Time to Die",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
//     rating: 8.2,
//     releaseDate: "2024-07-20",
//   },
//   {
//     id: "11",
//     title: "The Batman",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
//     rating: 8.4,
//     releaseDate: "2024-08-05",
//   },
//   {
//     id: "12",
//     title: "Mission: Impossible 8",
//     posterUrl:
//       "https://image.tmdb.org/t/p/w500/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg",
//     rating: 7.9,
//     releaseDate: "2024-09-22",
//   },
// ];

interface MovieSchema {
  id: string;
  title: string;
  description?: string;
  posterUrl: string;
  backdrop_path?: string;
  release_date?: string;
  rating: number;
  runtime: number;
}

interface MovieInterface {
  id: string;
  title: string;
  overview?: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  runtime: number;
  release_date?: string;
}

export default function LandingPage() {
  const [nowPlaying, setNowPlaying] = useState<MovieSchema[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieSchema[]>([]);
  const [homeMovie, setHomeMovie] = useState<MovieSchema>();
  const [loading, setLoading] = useState<boolean>(true);

  const isToken = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);

    const playing = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY_TMDB}`,
      },
    };

    const upcoming = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=IN`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY_TMDB}`,
      },
    };

    Promise.all([axios.request(playing), axios.request(upcoming)])
      .then(([playingRes, upcomingRes]) => {
        const nowPlayingResults = playingRes.data.results.map(
          (movie: MovieInterface) => ({
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            backdrop_path: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
            release_date: movie.release_date,
            rating: movie.vote_average,
            runtime: 148,
          })
        );

        const upcomingResults = upcomingRes.data.results.map(
          (movie: MovieInterface) => ({
            id: movie.id,
            title: movie.title,
            posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            release_date: movie.release_date,
            rating: movie.vote_average,
            runtime: 148,
          })
        );

        setNowPlaying(nowPlayingResults);
        setUpcomingMovies(upcomingResults);

        if (nowPlayingResults.length > 0) {
          const randomNumber = Math.floor(
            Math.random() * nowPlayingResults.length
          );
          setHomeMovie(nowPlayingResults[randomNumber]);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh]">
        <div className="absolute inset-0">
          <img
            src={homeMovie?.backdrop_path}
            alt={`${homeMovie?.title} backdrop`}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/80 to-transparent"></div>
        </div>

        <div className="container relative z-10 flex h-full flex-col items-start justify-end pb-24 pt-40">
          <p className="mb-4 inline-block rounded-full bg-cinema-red/80 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            Now Playing
          </p>

          <h1 className="mb-4 max-w-3xl animate-fade-in text-5xl font-bold leading-tight text-white md:text-6xl">
            {homeMovie?.title}
          </h1>
          <p className="mb-8 max-w-lg animate-fade-in text-lg text-white/90">
            {homeMovie?.description?.split(".")[0] ||
              "A mind-bending thriller that blurs the line between reality and dreams."}
          </p>
          <div className="flex flex-wrap items-center gap-4 animate-slide-in">
            <Button
              asChild
              className="gap-2 bg-cinema-red hover:bg-cinema-red/90"
            >
              <Link to={`/movies/${homeMovie?.id}/book`}>
                <Ticket className="h-4 w-4" />
                Book Tickets
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <Link
                to={`/movies/${homeMovie?.id}`}
                state={{ movie: homeMovie }}
              >
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-cinema-darker py-6">
        <div className="container flex items-center justify-center">
          <div className="flex w-full max-w-2xl items-center gap-2 rounded-full bg-muted p-1.5 shadow-xl">
            <div className="ml-3 text-gray-400">
              <SearchIcon className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search for movies, theaters, or showtimes..."
              className="w-full bg-transparent px-2 py-2 text-sm text-white placeholder-gray-400 outline-none"
            />
            <Button
              size="sm"
              className="rounded-full bg-cinema-red hover:bg-cinema-red/90"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Current Movies Section */}
      <section className="bg-cinema-dark py-16">
        <div className="container">
          <h2 className="section-heading mb-8 pl-4">Now Playing</h2>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {nowPlaying.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="p-1">
                    <MovieCard
                      id={movie.id}
                      title={movie.title}
                      description={movie.description ?? ""}
                      backdrop_path={movie.backdrop_path}
                      posterUrl={movie.posterUrl}
                      rating={movie.rating}
                      runtime={movie.runtime}
                      releaseDate={movie.release_date}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-cinema-dark/90 text-white border-gray-700 hover:bg-cinema-dark" />
            <CarouselNext className="right-2 bg-cinema-dark/90 text-white border-gray-700 hover:bg-cinema-dark" />
          </Carousel>
        </div>
      </section>

      {/* Upcoming Movies Section */}
      <section className="bg-gradient-to-b from-cinema-dark to-cinema-darker py-16">
        <div className="container">
          <h2 className="section-heading mb-8 pl-4">Coming Soon</h2>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {upcomingMovies.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="p-1">
                    <MovieCard
                      id={movie.id}
                      title={movie.title}
                      description={movie.description ?? ""}
                      backdrop_path={movie.backdrop_path}
                      posterUrl={movie.posterUrl}
                      rating={movie.rating}
                      runtime={movie.runtime}
                      releaseDate={movie.release_date}
                      isUpcoming={true}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-cinema-dark/90 text-white border-gray-700 hover:bg-cinema-dark" />
            <CarouselNext className="right-2 bg-cinema-dark/90 text-white border-gray-700 hover:bg-cinema-dark" />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cinema-darker py-20">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-r from-cinema-dark to-cinema-darker p-8 shadow-xl md:p-12">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Get the Full Experience
              </h2>
              {!isToken && (
                <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                  Create an account to book tickets, save your favorite movies,
                  and get personalized recommendations.
                </p>
              )}
              {isToken && (
                <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                  Book your tickets and watch movie at your nearest cinema hall
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {!isToken && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-cinema-red hover:bg-cinema-red/90"
                  >
                    <Link to="/signup">Create an Account</Link>
                  </Button>
                )}
                {!isToken && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Link to="/signin">Sign In</Link>
                  </Button>
                )}
                {isToken && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-cinema-red hover:bg-cinema-red/90"
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
