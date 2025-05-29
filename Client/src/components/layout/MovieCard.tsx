import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  genre: string[];
  duration: string;
  featured?: boolean;
}

const MovieCard = ({ id, title, posterUrl, rating, genre, duration, featured = false }: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`} className="movie-card block">
      <div className="relative h-[320px] md:h-[400px]">
        {/* Poster Image */}
        <img 
          src={posterUrl} 
          alt={`${title} poster`} 
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-lg">
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="default" className="bg-primary text-white">Featured</Badge>
            </div>
          )}
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-lg text-white truncate">{title}</h3>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                <span className="text-sm font-medium text-white">{rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-300 mr-1" />
                <span className="text-sm text-gray-300">{duration}</span>
              </div>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {genre.slice(0, 2).map((g, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-muted px-2 py-0.5 rounded-full text-gray-300"
                >
                  {g}
                </span>
              ))}
              {genre.length > 2 && (
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-gray-300">
                  +{genre.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
