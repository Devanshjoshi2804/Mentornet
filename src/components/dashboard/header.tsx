"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Simple mock function for logout
  const handleLogout = () => {
    localStorage.removeItem("mentornet_user");
    router.push("/");
  };

  // Check if a route is active
  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            <span className="text-emerald-600">Mentor</span>
            <span>Net</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/dashboard" 
              className={`px-3 py-2 ${isActive('/dashboard') ? 'text-gray-900 font-medium border-b-2 border-emerald-500' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/portfolio" 
              className={`px-3 py-2 ${isActive('/dashboard/portfolio') ? 'text-gray-900 font-medium border-b-2 border-emerald-500' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Portfolio
            </Link>
            <Link 
              href="/dashboard/marketplace" 
              className={`px-3 py-2 ${isActive('/dashboard/marketplace') ? 'text-gray-900 font-medium border-b-2 border-emerald-500' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Marketplace
            </Link>
            <Link 
              href="/learning-center" 
              className={`px-3 py-2 ${isActive('/learning-center') ? 'text-gray-900 font-medium border-b-2 border-emerald-500' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Learn
            </Link>
            <Link 
              href="/dashboard/mentors" 
              className={`px-3 py-2 ${isActive('/dashboard/mentors') ? 'text-gray-900 font-medium border-b-2 border-emerald-500' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Mentors
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-sm text-gray-700">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-medium">
                U
              </div>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
              <div className="py-2">
                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 