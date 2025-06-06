import { Link } from "react-router-dom";
import { Button } from "./button";
import { CalendarIcon, Clock, Star } from "lucide-react";

export interface MovieCardProps {
  id: string;
  title: string;
  description: string;
  backdrop_path?: string;
  posterUrl: string;
  rating: number;
  runtime?: number;
  releaseDate?: string;
  isUpcoming?: boolean;
}

export function MovieCard({
  id,
  title,
  description,
  posterUrl,
  backdrop_path,
  rating,
  runtime,
  releaseDate,
  isUpcoming = false,
}: MovieCardProps) {
  return (
    <div className="movie-card group">
      <div className="aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="movie-card-overlay flex flex-col justify-end p-4">
          <h3 className="mb-2 line-clamp-1 text-lg font-bold text-white">
            {title}
          </h3>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" />
              <span className="text-sm text-white">{rating.toFixed(1)}</span>
            </div>
            {runtime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-white/70" />
                <span className="text-sm text-white/70">{runtime} min</span>
              </div>
            )}
          </div>
          {isUpcoming && releaseDate ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 rounded bg-cinema-gold/20 px-2 py-1">
                <CalendarIcon className="h-3 w-3 text-cinema-gold" />
                <span className="text-xs font-medium text-cinema-gold">
                  {/* {releaseDate} */}
                  {new Date(releaseDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <Link
                  to={`/movies/${id}`}
                  state={{
                    movie: {
                      id,
                      title,
                      description: description || "",
                      posterUrl,
                      backdrop_path: backdrop_path || "",
                      rating,
                      runtime,
                      releaseDate,
                      isUpcoming: true,
                    },
                  }}
                >
                  Details
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <Link
                  to={`/movies/${id}`}
                  state={{
                    movie: {
                      id,
                      title,
                      description,
                      posterUrl,
                      backdrop_path,
                      rating,
                      runtime,
                      releaseDate,
                      isUpcoming: false,
                    },
                  }}
                >
                  Details
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-cinema-red hover:bg-cinema-red/90"
              >
                <Link
                  to={`/movies/${id}/book`}
                  state={{ movie: { title, posterUrl } }}
                >
                  Book Now
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
