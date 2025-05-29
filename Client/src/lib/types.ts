export interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  genre: string[];
  releaseDate: string;
  posterUrl: string;
  rating: string; // e.g., "PG-13", "R", etc.
  language: string;
  director: string;
  cast: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  address: string;
  totalScreens: number;
  amenities: string[];
  contact: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Screening {
  id: string;
  movieId: string;
  theaterId: string;
  screenNumber: number;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export interface DashboardStats {
  totalMovies: number;
  totalTheaters: number;
  totalScreenings: number;
  totalRevenue: number;
  ticketsSold: number;
  upcomingReleases: number;
}
