import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure application settings
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="mr-2 h-5 w-5" />
              Coming Soon
            </CardTitle>
            <CardDescription>
              This feature is under development and will be available soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium">System Settings</h3>
              <p className="text-muted-foreground mt-2">
                Here you will be able to configure system settings,
                notifications, payment integrations, and other preferences.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
