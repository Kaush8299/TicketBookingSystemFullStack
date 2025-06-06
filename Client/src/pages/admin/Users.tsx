import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

export default function Users() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage user accounts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Coming Soon
            </CardTitle>
            <CardDescription>
              This feature is under development and will be available soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium">User Management</h3>
              <p className="text-muted-foreground mt-2">
                Here you will be able to manage user accounts, permissions, and
                view user activity in the CineTicket platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
