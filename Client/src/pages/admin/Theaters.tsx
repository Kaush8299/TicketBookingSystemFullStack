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
import { Theater } from "@/lib/types";
import { toast } from "sonner";

// Mock data for theaters
const mockTheaters: Theater[] = [
  {
    id: "1",
    name: "Downtown Multiplex",
    location: "New York",
    address: "123 Main St, New York, NY 10001",
    totalScreens: 10,
    amenities: ["IMAX", "4DX", "VIP Seating", "Dolby Atmos"],
    contact: "+1-555-123-4567",
    email: "downtown@cineticket.com",
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-06-10T14:30:00Z",
  },
  {
    id: "2",
    name: "Westside Cinema",
    location: "Los Angeles",
    address: "456 Ocean Ave, Los Angeles, CA 90001",
    totalScreens: 8,
    amenities: ["3D", "Luxury Seating", "Dolby Surround"],
    contact: "+1-555-987-6543",
    email: "westside@cineticket.com",
    createdAt: "2023-02-20T09:15:00Z",
    updatedAt: "2023-05-18T11:45:00Z",
  },
  {
    id: "3",
    name: "Central Cinemas",
    location: "Chicago",
    address: "789 Lake St, Chicago, IL 60601",
    totalScreens: 6,
    amenities: ["Standard", "D-BOX Motion Seats"],
    contact: "+1-555-789-0123",
    email: "central@cineticket.com",
    createdAt: "2023-03-10T15:45:00Z",
    updatedAt: "2023-03-10T15:45:00Z",
  },
];

export default function Theaters() {
  const [theaters, setTheaters] = useState<Theater[]>(mockTheaters);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTheater, setNewTheater] = useState({
    name: "",
    location: "",
    address: "",
    totalScreens: "",
    amenities: "",
    contact: "",
    email: "",
  });

  const filteredTheaters = theaters.filter(
    (theater) =>
      theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theater.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTheater = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const createdAt = new Date().toISOString();

    const theater: Theater = {
      id,
      name: newTheater.name,
      location: newTheater.location,
      address: newTheater.address,
      totalScreens: parseInt(newTheater.totalScreens) || 0,
      amenities: newTheater.amenities.split(",").map((a) => a.trim()),
      contact: newTheater.contact,
      email: newTheater.email,
      createdAt,
      updatedAt: createdAt,
    };

    setTheaters([...theaters, theater]);
    setIsAddDialogOpen(false);
    toast.success("Theater added successfully!");

    // Reset form
    setNewTheater({
      name: "",
      location: "",
      address: "",
      totalScreens: "",
      amenities: "",
      contact: "",
      email: "",
    });
  };

  const handleDeleteTheater = (id: string) => {
    setTheaters(theaters.filter((theater) => theater.id !== id));
    toast.success("Theater deleted successfully!");
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Theaters</h1>
            <p className="text-muted-foreground">
              Manage your theater locations
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search theaters..."
                className="pl-8 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-cinema hover:bg-cinema/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Theater
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Theater</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter theater name"
                      value={newTheater.name}
                      onChange={(e) =>
                        setNewTheater({ ...newTheater, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={newTheater.location}
                      onChange={(e) =>
                        setNewTheater({
                          ...newTheater,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Full address"
                      value={newTheater.address}
                      onChange={(e) =>
                        setNewTheater({
                          ...newTheater,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="totalScreens">Total Screens</Label>
                      <Input
                        id="totalScreens"
                        type="number"
                        placeholder="8"
                        value={newTheater.totalScreens}
                        onChange={(e) =>
                          setNewTheater({
                            ...newTheater,
                            totalScreens: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amenities">Amenities</Label>
                      <Input
                        id="amenities"
                        placeholder="IMAX, 3D, VIP"
                        value={newTheater.amenities}
                        onChange={(e) =>
                          setNewTheater({
                            ...newTheater,
                            amenities: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        placeholder="+1-555-123-4567"
                        value={newTheater.contact}
                        onChange={(e) =>
                          setNewTheater({
                            ...newTheater,
                            contact: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="theater@example.com"
                        value={newTheater.email}
                        onChange={(e) =>
                          setNewTheater({
                            ...newTheater,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddTheater}
                    className="bg-cinema hover:bg-cinema/90 mt-2"
                  >
                    Add Theater
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Theater Locations</CardTitle>
            <CardDescription>
              {filteredTheaters.length} theater
              {filteredTheaters.length !== 1 ? "s" : ""} in the network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Screens</TableHead>
                    <TableHead>Amenities</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTheaters.map((theater) => (
                    <TableRow key={theater.id}>
                      <TableCell className="font-medium">
                        {theater.name}
                      </TableCell>
                      <TableCell>{theater.location}</TableCell>
                      <TableCell>{theater.totalScreens}</TableCell>
                      <TableCell>
                        {theater.amenities.slice(0, 2).join(", ")}
                        {theater.amenities.length > 2 && "..."}
                      </TableCell>
                      <TableCell>{theater.contact}</TableCell>
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
                            onClick={() => handleDeleteTheater(theater.id)}
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
