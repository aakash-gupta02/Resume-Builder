"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, LogOut, ChevronDown } from "lucide-react";

export default function DashboardNavbar({ user, onLogout, onOpenProfile }) {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileModalOpen &&
        !event.target.closest(".dashboard-profile-menu")
      ) {
        setProfileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileModalOpen]);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-blue-700">
              JobFolio
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* <Link href="/" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link> */}

            <div className="relative dashboard-profile-menu">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  onOpenProfile?.();
                  setProfileModalOpen((prev) => !prev);
                }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                  {user?.name?.[0]?.toUpperCase() ||
                    user?.email?.[0]?.toUpperCase() ||
                    "U"}
                </div>
                <span className="hidden sm:inline text-sm text-gray-700 max-w-40 truncate">
                  {user?.name || user?.email}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {profileModalOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border z-20 py-2">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || ""}
                    </p>
                  </div>

                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileModalOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>

                  <button
                    onClick={() => {
                      setProfileModalOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
