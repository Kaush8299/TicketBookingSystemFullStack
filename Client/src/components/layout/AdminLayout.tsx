import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { Toaster } from "@/components/ui/sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />

      <main className="lg:pl-64 pt-6">
        <div className="px-4 sm:px-6 lg:px-8 pb-10">{children}</div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
}
