"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Code2, 
  MessageSquare, 
  Star, 
  User, 
  Users 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Get mockMentors data
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
    verified: true,
    bio: "Blockchain developer with 5+ years of experience specializing in smart contract development and dApp architecture. Passionate about teaching and mentoring aspiring blockchain developers.",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "DeFi", "Web3.js", "Hardhat", "Truffle"],
    projects: [
      { 
        title: "DeFi Lending Platform", 
        description: "Developed a decentralized lending platform with automated interest rates and liquidation processes."
      },
      { 
        title: "NFT Marketplace", 
        description: "Created a marketplace for trading digital collectibles with royalty payment mechanisms."
      },
      { 
        title: "DAO Governance System", 
        description: "Implemented on-chain governance for a decentralized autonomous organization."
      }
    ],
    education: "MSc in Computer Science, specialization in Cryptography",
    languages: ["English", "Hindi"],
    testimonials: [
      { name: "Student 001", text: "Excellent mentor! Clear explanations and very patient." },
      { name: "Student 002", text: "Helped me understand complex blockchain concepts easily." }
    ]
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
    verified: true,
    bio: "Security focused blockchain expert specializing in smart contract auditing and vulnerability assessment. Committed to helping developers build more secure blockchain applications.",
    skills: ["Solidity", "Security Auditing", "EVM", "Static Analysis", "Formal Verification"],
    projects: [
      { 
        title: "Security Audit Framework", 
        description: "Developed an automated testing framework for smart contract security audits."
      },
      { 
        title: "Vulnerability Database", 
        description: "Created a comprehensive database of common smart contract vulnerabilities and remediation strategies."
      }
    ],
    education: "BSc in Computer Security",
    languages: ["English"],
    testimonials: [
      { name: "Student 003", text: "Incredible knowledge of security best practices." },
      { name: "Student 004", text: "Helped me identify and fix critical vulnerabilities in my project." }
    ]
  },
  // Add more simplified mock data for other mentors...
];

interface MentorPageProps {
  params: {
    mentorId: string;
  };
}

export default function MentorPage({ params }: MentorPageProps) {
  const [mentor, setMentor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to get mentor data
    const fetchMentor = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundMentor = mockMentors.find(m => m.id.toString() === params.mentorId);
        if (foundMentor) {
          setMentor(foundMentor);
        }
      } catch (error) {
        console.error("Error fetching mentor:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentor();
  }, [params.mentorId]);

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    
    return dates;
  };

  // Generate available time slots
  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 17) {
        slots.push(`${hour}:30`);
      }
    }
    return slots;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 animate-pulse">
        <div className="bg-gray-200 h-8 w-48 mb-4 rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-36 rounded-lg"></div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/dashboard/mentors" className="flex items-center text-sm font-medium mb-6 hover:text-emerald-600 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Mentors
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Mentor Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={mentor.image} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <h1 className="text-xl font-bold">{mentor.name}</h1>
                
                <p className="text-sm text-muted-foreground mb-2">{mentor.expertise}</p>
                
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({mentor.reviews} reviews)
                  </span>
                </div>
                
                {mentor.verified && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 mb-4">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Mentor
                  </Badge>
                )}
                
                <p className="text-sm font-mono mb-4">
                  {mentor.address.substring(0, 6)}...{mentor.address.substring(mentor.address.length - 4)}
                </p>
                
                <Badge variant="outline" className="border-emerald-500 text-emerald-600 mb-2">
                  Free Mentorship
                </Badge>
                
                <Button className="w-full" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" /> Message
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Availability</CardTitle>
              <CardDescription>Schedule a mentorship session</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Select a date:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {getAvailableDates().map((date) => (
                      <Button
                        key={date.date}
                        variant={selectedDate === date.date ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => setSelectedDate(date.date)}
                      >
                        <Calendar className="w-3 h-3 mr-2" /> {date.display}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {selectedDate && (
                  <div>
                    <div className="text-sm font-medium mb-2">Select a time:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {getAvailableTimeSlots().map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          className="justify-start"
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="w-3 h-3 mr-2" /> {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedDate && selectedTime && (
                  <Button className="w-full mt-4">
                    Book Session
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full rounded-none border-b">
                  <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                  <TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="about" className="mt-0 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Bio</h3>
                      <p className="text-muted-foreground">{mentor.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {mentor.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            <Code2 className="w-3 h-3 mr-1" /> {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Education</h3>
                        <div className="flex items-start">
                          <BookOpen className="w-4 h-4 mt-1 mr-2 text-emerald-500" />
                          <span>{mentor.education}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {mentor.languages.map((language: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="projects" className="mt-0 space-y-4">
                    <h3 className="text-lg font-medium mb-2">Past Projects</h3>
                    {mentor.projects.map((project: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-0 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Student Reviews</h3>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium text-lg">{mentor.rating}</span>
                        <span className="text-sm text-muted-foreground ml-1">
                          ({mentor.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    
                    {mentor.testimonials.map((testimonial: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarFallback>
                                {testimonial.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center mb-1">
                                <h4 className="font-medium text-sm">{testimonial.name}</h4>
                                <div className="ml-2 flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.text}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="text-center">
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" /> See All Reviews
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Similar Mentors */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Similar Mentors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockMentors
                .filter(m => m.id !== mentor.id)
                .slice(0, 3)
                .map(similarMentor => (
                  <Card key={similarMentor.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex items-center">
                        <Avatar className="h-12 w-12 mr-3">
                          <AvatarImage src={similarMentor.image} alt={similarMentor.name} />
                          <AvatarFallback>{similarMentor.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-1">{similarMentor.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">{similarMentor.expertise}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-xs">{similarMentor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/dashboard/mentors/${similarMentor.id}`}>
                        <Button variant="secondary" size="sm" className="w-full rounded-none">
                          View Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 