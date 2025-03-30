"use client";

import React from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col md:flex-row container mx-auto px-4 py-6">
        <Sidebar />
        
        {/* Main content */}
        <main className="flex-1 md:pl-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} MentorNet. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500 mt-4 md:mt-0">
              <a href="/terms" className="hover:text-gray-900">Terms</a>
              <a href="/privacy" className="hover:text-gray-900">Privacy</a>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 