import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CalendarClock, MapPin, Ticket } from "lucide-react";

interface BookingDetails {
  bookingId: string;
  movieId: string;
  movieTitle: string;
  cinemaName: string;
  showDate: string;
  showTime: string;
  seats: string[];
  totalAmount: number;
}

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get booking details from location state
  const bookingDetails = location.state as BookingDetails;
  
  useEffect(() => {
    // If no booking details, redirect to home
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);
  
  if (!bookingDetails) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-4">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your tickets have been booked successfully. Your booking ID is <span className="font-semibold">{bookingDetails.bookingId}</span>.
            </p>
          </div>
          
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6 space-y-6">
              <div>
                <h2 className="font-semibold text-lg">{bookingDetails.movieTitle}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <CalendarClock className="h-4 w-4 mr-2" />
                    Date & Time
                  </div>
                  <p>
                    {new Date(bookingDetails.showDate).toLocaleDateString()} | {bookingDetails.showTime}
                  </p>
                </div>
                
                <div className="space-y-1.5">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Cinema
                  </div>
                  <p>{bookingDetails.cinemaName}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-1.5">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Ticket className="h-4 w-4 mr-2" />
                  Seats
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bookingDetails.seats.map((seat) => (
                    <span key={seat} className="bg-muted px-2 py-1 rounded-md text-sm font-medium">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket Price</span>
                  <span>${(bookingDetails.totalAmount - 1.50).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Convenience Fee</span>
                  <span>$1.50</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">${bookingDetails.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Important Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Please arrive at least 15 minutes before the show. Present your booking ID at the counter to collect your tickets.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-6 flex-col space-y-2">
              <Button className="w-full">
                Download E-Ticket
              </Button>
              <div className="flex gap-4 w-full">
                <Link to="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
