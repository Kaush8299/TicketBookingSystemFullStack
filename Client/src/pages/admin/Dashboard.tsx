import AdminLayout from "@/components/layout/AdminLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  Film,
  Theater,
  Calendar,
  Ticket,
  DollarSign,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardStats } from "@/lib/types";

// Mock data for initial dashboard
const dashboardStats: DashboardStats = {
  totalMovies: 24,
  totalTheaters: 8,
  totalScreenings: 156,
  totalRevenue: 45620,
  ticketsSold: 3200,
  upcomingReleases: 5,
};

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to CineTicket Admin Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Total Movies"
            value={dashboardStats.totalMovies}
            icon={<Film className="h-4 w-4" />}
          />
          <DashboardCard
            title="Total Theaters"
            value={dashboardStats.totalTheaters}
            icon={<Theater className="h-4 w-4" />}
          />
          <DashboardCard
            title="Total Screenings"
            value={dashboardStats.totalScreenings}
            icon={<Calendar className="h-4 w-4" />}
          />
          <DashboardCard
            title="Revenue"
            value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4" />}
            trend="up"
            trendValue="12% from last month"
          />
          <DashboardCard
            title="Tickets Sold"
            value={dashboardStats.ticketsSold.toLocaleString()}
            icon={<Ticket className="h-4 w-4" />}
          />
          <DashboardCard
            title="Upcoming Releases"
            value={dashboardStats.upcomingReleases}
            icon={<CalendarIcon className="h-4 w-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest activities in your cinema chain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-cinema-light p-2 rounded-md">
                    <Film className="h-5 w-5 text-cinema" />
                  </div>
                  <div>
                    <p className="font-medium">New Movie Added</p>
                    <p className="text-sm text-muted-foreground">
                      "Interstellar 2" was added to the catalog
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-cinema-light p-2 rounded-md">
                    <Theater className="h-5 w-5 text-cinema" />
                  </div>
                  <div>
                    <p className="font-medium">Theater Updated</p>
                    <p className="text-sm text-muted-foreground">
                      Downtown Multiplex information was updated
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      5 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-cinema-light p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-cinema" />
                  </div>
                  <div>
                    <p className="font-medium">New Screenings Added</p>
                    <p className="text-sm text-muted-foreground">
                      12 new screenings were added for "Avatar 3"
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Yesterday
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Movies</CardTitle>
              <CardDescription>Top performing movies this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                      1
                    </div>
                    <span>Dune: Part Two</span>
                  </div>
                  <span className="text-sm font-medium">$12,400</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                      2
                    </div>
                    <span>Deadpool & Wolverine</span>
                  </div>
                  <span className="text-sm font-medium">$9,850</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                      3
                    </div>
                    <span>Gladiator II</span>
                  </div>
                  <span className="text-sm font-medium">$7,320</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
