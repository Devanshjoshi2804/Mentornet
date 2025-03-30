"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpenCheck, CheckCircle, Clock, MessageSquare, Star } from "lucide-react";
import Link from "next/link";

// Updated Mentor interface with all the fields from our new data structure
interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  projects: number;
  rating: number;
  available: boolean;
  imageUrl: string;
  reviews?: number;
  hourlyRate?: number;
  availability?: string;
  address?: string;
  verified?: boolean;
}

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data with the new structure
  const mockMentors = [
    {
      id: 1,
      name: "Rohit Shahi",
      expertise: "Blockchain Development",
      rating: 4.9,
      reviews: 127,
      availability: "Mon-Fri, 9AM-5PM",
      address: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
      image: "https://placehold.co/600x400/4F46E5/FFFFFF/png?text=RS",
      verified: true
    },
    {
      id: 2,
      name: "Mentor 002",
      expertise: "Smart Contract Auditing",
      rating: 4.7,
      reviews: 94,
      availability: "Weekdays, Evenings",
      address: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
      image: "https://placehold.co/600x400/22C55E/FFFFFF/png?text=002",
      verified: true
    },
    {
      id: 3,
      name: "Mentor 003",
      expertise: "DeFi Protocol Development",
      rating: 4.8,
      reviews: 112,
      availability: "Flexible Schedule",
      address: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
      image: "https://placehold.co/600x400/EF4444/FFFFFF/png?text=003",
      verified: true
    },
    {
      id: 4,
      name: "Mentor 004",
      expertise: "Web3 Frontend Development",
      rating: 4.6,
      reviews: 87,
      availability: "Weekends, Evenings",
      address: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
      image: "https://placehold.co/600x400/8B5CF6/FFFFFF/png?text=004",
      verified: true
    },
    {
      id: 5,
      name: "Mentor 005",
      expertise: "Tokenomics & Blockchain Economics",
      rating: 4.9,
      reviews: 143,
      availability: "Mon-Thu, 10AM-6PM",
      address: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
      image: "https://placehold.co/600x400/F59E0B/FFFFFF/png?text=005",
      verified: true
    },
    {
      id: 6,
      name: "Mentor 006",
      expertise: "Solidity Programming",
      rating: 4.8,
      reviews: 105,
      availability: "Tue-Sat, Flexible",
      address: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
      image: "https://placehold.co/600x400/06B6D4/FFFFFF/png?text=006",
      verified: true
    },
    {
      id: 7,
      name: "Mentor 007",
      expertise: "NFT Development",
      rating: 4.7,
      reviews: 92,
      availability: "Weekends Only",
      address: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
      image: "https://placehold.co/600x400/EC4899/FFFFFF/png?text=007",
      verified: false
    },
    {
      id: 8,
      name: "Mentor 008",
      expertise: "Blockchain Security",
      rating: 4.9,
      reviews: 138,
      availability: "Mon-Fri, 2PM-10PM",
      address: "0xf29bbCFB987F3618515ddDe75D6CAd34cc1855D7",
      image: "https://placehold.co/600x400/14B8A6/FFFFFF/png?text=008",
      verified: true
    }
  ];

  useEffect(() => {
    async function loadMentors() {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from API or blockchain
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Map the mock mentors to match our Mentor interface
        setMentors(mockMentors.map((m) => ({
          id: m.id.toString(),
          name: m.name,
          expertise: [m.expertise], // Wrap the expertise string in an array
          projects: Math.floor(Math.random() * 15) + 5, // Random project count
          rating: m.rating,
          available: true,
          imageUrl: m.image,
          reviews: m.reviews,
          availability: m.availability,
          address: m.address,
          verified: m.verified
        })));
      } catch (error) {
        console.error("Error loading mentors:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMentors();
  }, []);

  const filteredMentors = mentors.filter(
    mentor =>
      mentor.name.toLowerCase().includes(filter.toLowerCase()) ||
      mentor.expertise.some(skill =>
        skill.toLowerCase().includes(filter.toLowerCase())
      )
  );

  // Rest of the component remains the same
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Find a Mentor</h1>
          <p className="text-muted-foreground">
            Connect with blockchain experts who can guide your learning journey
          </p>
        </div>

        {/* Filter input */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search mentors by name or expertise..."
            className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        {/* Mentor cards grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse h-72">
                <CardContent className="p-0">
                  <div className="h-full bg-gray-200"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map(mentor => (
              <Card key={mentor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-40 bg-gradient-to-r from-emerald-500 to-teal-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Avatar className="h-20 w-20 border-4 border-white">
                        <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    {mentor.verified && (
                      <Badge variant="default" className="absolute top-2 right-2 bg-emerald-600">
                        <CheckCircle className="h-3 w-3 mr-1" /> Verified Mentor
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {mentor.expertise.join(", ")}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({mentor.reviews || 0})
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <BookOpenCheck className="w-4 h-4 mr-2" />
                        <span>{mentor.projects} projects mentored</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{mentor.availability}</span>
                      </div>
                      {mentor.address && (
                        <div className="flex items-center text-muted-foreground">
                          <span className="font-mono text-xs truncate">{mentor.address.substring(0, 6)}...{mentor.address.substring(mentor.address.length - 4)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-emerald-600 font-medium">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600">
                          Free Mentorship
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" /> Message
                        </Button>
                        <Link href={`/dashboard/mentors/${mentor.id}`}>
                          <Button size="sm">View Profile</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}