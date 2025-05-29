import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function Screenings() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Screenings</h1>
          <p className="text-muted-foreground">Manage your movie screenings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Coming Soon
            </CardTitle>
            <CardDescription>
              This feature is under development and will be available soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium">Screening Management</h3>
              <p className="text-muted-foreground mt-2">
                Here you will be able to schedule movie screenings, manage
                showtimes, and configure pricing for each theater location.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
