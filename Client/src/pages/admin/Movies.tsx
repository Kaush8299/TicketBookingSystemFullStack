import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash, Eye } from "lucide-react";
import { Movie } from "@/lib/types";
import { toast } from "sonner";

// Mock data for movies
const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Dune: Part Two",
    description:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    duration: 166,
    genre: ["Sci-Fi", "Adventure"],
    releaseDate: "2024-03-01",
    posterUrl: "https://via.placeholder.com/150",
    rating: "PG-13",
    language: "English",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
  },
  {
    id: "2",
    title: "Deadpool & Wolverine",
    description:
      "Wade Wilson joins forces with Wolverine in a high-stakes adventure.",
    duration: 122,
    genre: ["Action", "Comedy"],
    releaseDate: "2024-07-26",
    posterUrl: "https://via.placeholder.com/150",
    rating: "R",
    language: "English",
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
    createdAt: "2024-02-10T10:30:00Z",
    updatedAt: "2024-02-10T10:30:00Z",
  },
  {
    id: "3",
    title: "Gladiator II",
    description:
      "The sequel to the Academy Award winning historical epic film Gladiator.",
    duration: 158,
    genre: ["Action", "Drama", "Historical"],
    releaseDate: "2024-11-22",
    posterUrl: "https://via.placeholder.com/150",
    rating: "R",
    language: "English",
    director: "Ridley Scott",
    cast: ["Paul Mescal", "Pedro Pascal", "Denzel Washington"],
    createdAt: "2024-04-05T14:15:00Z",
    updatedAt: "2024-04-05T14:15:00Z",
  },
];

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    duration: "",
    genre: "",
    releaseDate: "",
    rating: "",
    language: "",
    director: "",
    cast: "",
  });

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.join(" ").toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMovie = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const createdAt = new Date().toISOString();

    const movie: Movie = {
      id,
      title: newMovie.title,
      description: newMovie.description,
      duration: parseInt(newMovie.duration) || 0,
      genre: newMovie.genre.split(",").map((g) => g.trim()),
      releaseDate: newMovie.releaseDate,
      posterUrl: "https://via.placeholder.com/150",
      rating: newMovie.rating,
      language: newMovie.language,
      director: newMovie.director,
      cast: newMovie.cast.split(",").map((c) => c.trim()),
      createdAt,
      updatedAt: createdAt,
    };

    setMovies([...movies, movie]);
    setIsAddDialogOpen(false);
    toast.success("Movie added successfully!");

    // Reset form
    setNewMovie({
      title: "",
      description: "",
      duration: "",
      genre: "",
      releaseDate: "",
      rating: "",
      language: "",
      director: "",
      cast: "",
    });
  };

  const handleDeleteMovie = (id: string) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    toast.success("Movie deleted successfully!");
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Movies</h1>
            <p className="text-muted-foreground">Manage your movie catalog</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movies..."
                className="pl-8 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-cinema hover:bg-cinema/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Movie
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Movie</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter movie title"
                      value={newMovie.title}
                      onChange={(e) =>
                        setNewMovie({ ...newMovie, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Enter movie description"
                      value={newMovie.description}
                      onChange={(e) =>
                        setNewMovie({
                          ...newMovie,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="120"
                        value={newMovie.duration}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, duration: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="releaseDate">Release Date</Label>
                      <Input
                        id="releaseDate"
                        type="date"
                        value={newMovie.releaseDate}
                        onChange={(e) =>
                          setNewMovie({
                            ...newMovie,
                            releaseDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="genre">Genres (comma-separated)</Label>
                    <Input
                      id="genre"
                      placeholder="Action, Adventure, Comedy"
                      value={newMovie.genre}
                      onChange={(e) =>
                        setNewMovie({ ...newMovie, genre: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        placeholder="PG-13"
                        value={newMovie.rating}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, rating: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <Input
                        id="language"
                        placeholder="English"
                        value={newMovie.language}
                        onChange={(e) =>
                          setNewMovie({ ...newMovie, language: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="director">Director</Label>
                    <Input
                      id="director"
                      placeholder="Director name"
                      value={newMovie.director}
                      onChange={(e) =>
                        setNewMovie({ ...newMovie, director: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cast">Cast (comma-separated)</Label>
                    <Input
                      id="cast"
                      placeholder="Actor 1, Actor 2"
                      value={newMovie.cast}
                      onChange={(e) =>
                        setNewMovie({ ...newMovie, cast: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    onClick={handleAddMovie}
                    className="bg-cinema hover:bg-cinema/90 mt-2"
                  >
                    Add Movie
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Movie Catalog</CardTitle>
            <CardDescription>
              {filteredMovies.length} movie
              {filteredMovies.length !== 1 ? "s" : ""} in the catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovies.map((movie) => (
                    <TableRow key={movie.id}>
                      <TableCell className="font-medium">
                        {movie.title}
                      </TableCell>
                      <TableCell>{movie.genre.join(", ")}</TableCell>
                      <TableCell>{movie.duration} min</TableCell>
                      <TableCell>{movie.rating}</TableCell>
                      <TableCell>
                        {new Date(movie.releaseDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteMovie(movie.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
