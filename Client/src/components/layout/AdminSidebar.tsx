import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Film,
  Theater,
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const mainNav: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { title: "Movies", icon: Film, href: "/admin/movies" },
  { title: "Theaters", icon: Theater, href: "/admin/theaters" },
  { title: "Screenings", icon: Calendar, href: "/admin/screenings" },
];

const secondaryNav: NavItem[] = [
  { title: "Users", icon: User, href: "/admin/users" },
  { title: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  console.log(location);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-sidebar transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo section */}
        <div
          className={cn(
            "h-16 flex items-center px-4 border-b border-sidebar-border",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <div className="text-sidebar-foreground font-bold text-xl">
              CineTicket
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-cinema text-white"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )
                }
              >
                <item.icon
                  className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")}
                />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 px-3">
            <div
              className={cn(
                "h-px bg-sidebar-border mb-4",
                collapsed ? "mx-2" : "mx-0"
              )}
            />
            <h3
              className={cn(
                "px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider",
                collapsed ? "sr-only" : ""
              )}
            >
              Administration
            </h3>
            <nav className="mt-2 space-y-1">
              {secondaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-cinema text-white"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )
                  }
                >
                  <item.icon
                    className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")}
                  />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* logout */}
        <div
          className={cn(
            "p-4  border-t border-sidebar-border flex items-center",
            collapsed ? "justify-center" : ""
          )}
        >
          {!collapsed && (
            <div className="ml-3">
              <Button
                variant="outline"
                onClick={() => <NavLink to="/signin" />}
              >
                <LogOut />
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* User profile */}
        <div
          className={cn(
            "p-4  border-t border-sidebar-border flex items-center",
            collapsed ? "justify-center" : ""
          )}
        >
          <div className="h-8 w-8 rounded-full bg-cinema flex items-center justify-center text-white">
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-sidebar-foreground">
                Admin
              </p>
              <p className="text-xs text-sidebar-foreground/70">
                admin@cineticket.com
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        className="fixed bottom-4 right-4 lg:hidden z-50 p-2 rounded-full bg-cinema text-white shadow-lg"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
}
