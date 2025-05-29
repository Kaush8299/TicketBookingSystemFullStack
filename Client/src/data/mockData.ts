export interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    backdropUrl: string;
    rating: number;
    releaseDate: string;
    genre: string[];
    duration: string;
    description: string;
    director: string;
    cast: string[];
    featured?: boolean;
  }
  
  export interface Cinema {
    id: string;
    name: string;
    location: string;
    address: string;
  }
  
  export interface Showtime {
    id: string;
    movieId: string;
    cinemaId: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    screenType: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  export interface Booking {
    id: string;
    userId: string;
    showtimeId: string;
    movieId: string;
    cinemaId: string;
    seats: string[];
    totalAmount: number;
    paymentStatus: 'pending' | 'completed';
    bookingDate: string;
  }
  
  // Mock Movies
  export const movies: Movie[] = [
    {
      id: "m1",
      title: "Dune: Part Two",
      posterUrl: "https://images.unsplash.com/photo-1613051889876-1a275548abba?q=80&w=2576&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1630839437035-dac17da580d0?q=80&w=2670&auto=format&fit=crop",
      rating: 8.7,
      releaseDate: "2024-03-01",
      genre: ["Sci-Fi", "Adventure", "Drama"],
      duration: "2h 46m",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      director: "Denis Villeneuve",
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Oscar Isaac"],
      featured: true
    },
    {
      id: "m2",
      title: "Godzilla x Kong: The New Empire",
      posterUrl: "https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?q=80&w=2670&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop",
      rating: 7.8,
      releaseDate: "2024-03-29",
      genre: ["Action", "Sci-Fi", "Thriller"],
      duration: "1h 55m",
      description: "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.",
      director: "Adam Wingard",
      cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens"],
      featured: true
    },
    {
      id: "m3",
      title: "The Fall Guy",
      posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2625&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=2532&auto=format&fit=crop",
      rating: 7.2,
      releaseDate: "2024-05-03",
      genre: ["Action", "Comedy"],
      duration: "2h 6m",
      description: "A stuntman is drawn back into a dangerous profession he thought he'd left behind when the star of a big-budget film goes missing.",
      director: "David Leitch",
      cast: ["Ryan Gosling", "Emily Blunt", "Aaron Taylor-Johnson"],
      featured: false
    },
    {
      id: "m4",
      title: "Kingdom of the Planet of the Apes",
      posterUrl: "https://images.unsplash.com/photo-1533228705496-072ca298b122?q=80&w=2670&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1599335937789-71aaa1b8b769?q=80&w=2670&auto=format&fit=crop",
      rating: 7.5,
      releaseDate: "2024-05-10",
      genre: ["Action", "Adventure", "Sci-Fi"],
      duration: "2h 25m",
      description: "Several generations in the future after Caesar's reign, apes are now the dominant species and humans have been reduced to living in the shadows.",
      director: "Wes Ball",
      cast: ["Owen Teague", "Freya Allan", "Kevin Durand"],
      featured: false
    },
    {
      id: "m5",
      title: "Furiosa: A Mad Max Saga",
      posterUrl: "https://images.unsplash.com/photo-1617886903355-9824424c5b4b?q=80&w=2574&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1580402427914-a6cc60d7d150?q=80&w=2670&auto=format&fit=crop",
      rating: 8.1,
      releaseDate: "2024-05-24",
      genre: ["Action", "Adventure", "Sci-Fi"],
      duration: "2h 30m",
      description: "The origin story of renegade warrior Furiosa before her encounter with Mad Max.",
      director: "George Miller",
      cast: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke"],
      featured: true
    },
    {
      id: "m6",
      title: "Despicable Me 4",
      posterUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2688&auto=format&fit=crop",
      backdropUrl: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?q=80&w=2580&auto=format&fit=crop",
      rating: 7.0,
      releaseDate: "2024-07-03",
      genre: ["Animation", "Comedy", "Family"],
      duration: "1h 35m",
      description: "Gru, Lucy, Margo, Edith, and Agnes welcome a new member to the family, Gru Jr.",
      director: "Chris Renaud",
      cast: ["Steve Carell", "Kristen Wiig", "Pierre Coffin"],
      featured: false
    }
  ];
  
  // Mock Cinemas
  export const cinemas: Cinema[] = [
    {
      id: "c1",
      name: "CinePlex Deluxe",
      location: "Downtown",
      address: "123 Main Street, City Center"
    },
    {
      id: "c2",
      name: "Star Cinemas",
      location: "Westside Mall",
      address: "456 Commerce Ave, Westside"
    },
    {
      id: "c3",
      name: "IMAX Plaza",
      location: "North District",
      address: "789 Technology Park, North District"
    }
  ];
  
  // Mock Showtimes
  export const showtimes: Showtime[] = [
    // For Dune Part 2
    {
      id: "st1",
      movieId: "m1",
      cinemaId: "c1",
      date: "2024-04-10",
      startTime: "10:00",
      endTime: "12:46",
      price: 12.99,
      screenType: "Standard"
    },
    {
      id: "st2",
      movieId: "m1",
      cinemaId: "c1",
      date: "2024-04-10",
      startTime: "13:30",
      endTime: "16:16",
      price: 12.99,
      screenType: "Standard"
    },
    {
      id: "st3",
      movieId: "m1",
      cinemaId: "c1",
      date: "2024-04-10",
      startTime: "17:00",
      endTime: "19:46",
      price: 14.99,
      screenType: "Standard"
    },
    {
      id: "st4",
      movieId: "m1",
      cinemaId: "c2",
      date: "2024-04-10",
      startTime: "11:15",
      endTime: "14:01",
      price: 15.99,
      screenType: "IMAX"
    },
    {
      id: "st5",
      movieId: "m1",
      cinemaId: "c2",
      date: "2024-04-10",
      startTime: "14:45",
      endTime: "17:31",
      price: 15.99,
      screenType: "IMAX"
    },
    {
      id: "st6",
      movieId: "m1",
      cinemaId: "c3",
      date: "2024-04-10",
      startTime: "16:30",
      endTime: "19:16",
      price: 18.99,
      screenType: "IMAX 3D"
    },
    
    // For Godzilla x Kong
    {
      id: "st7",
      movieId: "m2",
      cinemaId: "c1",
      date: "2024-04-10",
      startTime: "11:00",
      endTime: "12:55",
      price: 12.99,
      screenType: "Standard"
    },
    {
      id: "st8",
      movieId: "m2",
      cinemaId: "c2",
      date: "2024-04-10",
      startTime: "13:30",
      endTime: "15:25",
      price: 15.99,
      screenType: "IMAX"
    }
  ];
  
  // Mock Users
  export const users: User[] = [
    {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890"
    }
  ];
  
  // Mock Bookings
  export const bookings: Booking[] = [
    {
      id: "b1",
      userId: "u1",
      showtimeId: "st3",
      movieId: "m1",
      cinemaId: "c1",
      seats: ["F5", "F6"],
      totalAmount: 29.98,
      paymentStatus: "completed",
      bookingDate: "2024-04-05"
    }
  ];
  