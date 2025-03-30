"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  mentor: {
    id: string;
    name: string;
    imageUrl: string;
  };
  status: "Not Started" | "In Progress" | "Completed";
  progress: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Build a Simple NFT Marketplace",
    description: "Create a basic NFT marketplace with listing, buying, and selling functionalities using ERC-721 tokens.",
    skills: ["Solidity", "React", "Web3.js"],
    difficulty: "Intermediate",
    duration: "4 weeks",
    mentor: {
      id: "2",
      name: "Jane Smith",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    status: "In Progress",
    progress: 45,
  },
  {
    id: "2",
    title: "Smart Contract Security Analysis",
    description: "Learn to analyze and audit smart contracts for security vulnerabilities and best practices.",
    skills: ["Solidity", "Security", "Auditing"],
    difficulty: "Advanced",
    duration: "6 weeks",
    mentor: {
      id: "3",
      name: "Michael Johnson",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    status: "Not Started",
    progress: 0,
  },
  {
    id: "3",
    title: "Introduction to DeFi Protocols",
    description: "Understand the fundamentals of DeFi protocols and implement a simple lending/borrowing platform.",
    skills: ["DeFi", "Solidity", "Blockchain"],
    difficulty: "Beginner",
    duration: "3 weeks",
    mentor: {
      id: "1",
      name: "John Doe",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    status: "Completed",
    progress: 100,
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Simulate loading data from API or blockchain
    const loadProjects = async () => {
      try {
        // In a real app, we would fetch from API or blockchain
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProjects(mockProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = statusFilter === "all" 
    ? projects 
    : projects.filter(project => project.status.toLowerCase() === statusFilter.toLowerCase());

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">My Projects</h1>
        <p className="text-gray-500 mt-1">
          Track and manage your blockchain development projects
        </p>
      </div>

      {/* Filters and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === "all" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === "in progress" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}
            onClick={() => setStatusFilter("in progress")}
          >
            In Progress
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${statusFilter === "not started" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}
            onClick={() => setStatusFilter("not started")}
          >
            Not Started
          </button>
        </div>
        <Link
          href="/dashboard/projects/browse"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md"
        >
          Browse Available Projects
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No projects found matching your criteria.</p>
          <Link
            href="/dashboard/projects/browse"
            className="mt-4 inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md"
          >
            Browse Available Projects
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <p className="text-gray-600 mt-1 mb-4 md:mb-0">{project.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span 
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : project.status === "In Progress" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md whitespace-nowrap"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium">Progress: {project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${project.progress}%` }}  
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row sm:justify-between">
                  <div className="flex space-x-4 items-center mb-4 sm:mb-0">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img 
                        src={project.mentor.imageUrl} 
                        alt={`${project.mentor.name}'s profile`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Mentor: </span>
                      <Link href={`/dashboard/mentors/${project.mentor.id}`} className="text-emerald-600 hover:underline">
                        {project.mentor.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 