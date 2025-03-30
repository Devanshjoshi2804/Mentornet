"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isActiveSection = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <aside className="w-full md:w-64 py-6 md:pr-6">
      <div className="bg-white p-4 rounded-lg border mb-6">
        <h3 className="text-base font-medium mb-3">Wallet</h3>
        <div className="text-sm">
          <div className="mb-1 flex">
            <span className="text-gray-500 mr-2">Address:</span>
            <span className="font-mono text-xs truncate">0xf29bbCF9987...</span>
          </div>
          <div className="mb-1 flex">
            <span className="text-gray-500 mr-2">Network:</span>
            <span>Polygon Amoy</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 mr-2">Balance:</span>
            <span>1.5 MATIC</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
          Quick Links
        </h3>
        <nav className="space-y-1">
          <Link
            href="/dashboard/learn"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActiveSection("/dashboard/learn") ? "text-emerald-700 bg-emerald-50" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Learning Paths</span>
          </Link>
          <Link
            href="/dashboard/ai-mentor"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActiveSection("/dashboard/ai-mentor") ? "text-emerald-700 bg-emerald-50" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Ask AI Mentor</span>
          </Link>
          <Link
            href="/dashboard/projects"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActiveSection("/dashboard/projects") ? "text-emerald-700 bg-emerald-50" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">My Projects</span>
          </Link>
          <Link
            href="/dashboard/mentors"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActiveSection("/dashboard/mentors") ? "text-emerald-700 bg-emerald-50" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Find Mentors</span>
          </Link>
        </nav>
      </div>

      <div className="h-[calc(100vh-24rem)] overflow-auto pr-2">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
          Dashboard
        </h3>

        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Overview</span>
          </Link>
          <Link
            href="/dashboard/mentors"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard/mentors")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Mentors</span>
          </Link>
          <Link
            href="/dashboard/projects"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard/projects")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Projects</span>
          </Link>
          <Link
            href="/dashboard/certificates"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard/certificates")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Certificates</span>
          </Link>
          <Link
            href="/dashboard/portfolio"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard/portfolio")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Portfolio</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard/profile")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Profile</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard/settings")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Settings</span>
          </Link>
          <Link
            href="/dashboard/market-trends"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard/market-trends")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Market Trends</span>
          </Link>
        </nav>
        
        <div className="pt-6 mt-6 border-t border-gray-200">
          <Link
            href="/learning-center"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActiveSection("/learning-center")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Learning Center</span>
          </Link>
          <Link
            href="/dashboard-mentor"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActiveSection("/dashboard-mentor")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Mentor Dashboard</span>
          </Link>
          <Link
            href="/dashboard/marketplace"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActiveSection("/dashboard/marketplace")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Marketplace</span>
          </Link>
          <Link
            href="/dashboard/community"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              isActiveSection("/dashboard/community")
                ? "text-emerald-700 bg-emerald-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="truncate">Community</span>
          </Link>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md text-sm">
          <p className="font-medium text-blue-800 mb-1">⚠️ Testnet Mode</p>
          <p className="text-blue-600">You are using the test network. No real assets are involved.</p>
        </div>
      </div>
    </aside>
  );
} 