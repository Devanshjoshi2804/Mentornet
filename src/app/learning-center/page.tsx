"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useAccount } from 'wagmi';
import { ConnectButton } from "@/components/wallet/connect-button";
// import { YoutubePlayer } from "@/components/ui/youtube-player";
import { YouTubePlayer } from "@/components/videos/youtube-player";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Play, Award, Clock, BookOpen, Star, Users, CheckCircle } from "lucide-react";
import { useIsVideoCompleted } from "@/lib/videoVerification";

// Sample course data structure
const courses = [
  {
    id: 1,
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptographic principles.",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000",
    level: "Beginner",
    duration: "4 hours",
    rating: 4.8,
    students: 1245,
    instructor: "Dr. Sarah Chen",
    featured: true,
    category: "Blockchain",
    modules: [
      {
        id: 1,
        title: "Introduction to Blockchain",
        description: "Understanding the fundamental concepts of blockchain technology",
        videoId: "SSo_EIwHSd4",
        duration: "45 min",
        order: 1
      },
      {
        id: 2,
        title: "Distributed Ledger Technology",
        description: "Exploring how distributed ledgers work and their benefits",
        videoId: "ZE2HxTmxfrI",
        duration: "38 min",
        order: 2
      },
      {
        id: 3,
        title: "Consensus Mechanisms",
        description: "Deep dive into Proof of Work, Proof of Stake, and other consensus mechanisms",
        videoId: "t59Gq0LxBhg",
        duration: "52 min",
        order: 3
      },
      {
        id: 4,
        title: "Public vs Private Blockchains",
        description: "Understanding the differences between public and private blockchain networks",
        videoId: "WgU5NxUgwQQ",
        duration: "35 min",
        order: 4
      }
    ]
  },
  {
    id: 2,
    title: "Smart Contract Development",
    description: "Master the art of writing secure and efficient smart contracts with Solidity for the Ethereum blockchain.",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=1000",
    level: "Intermediate",
    duration: "6 hours",
    rating: 4.9,
    students: 876,
    instructor: "Alex Rodriguez",
    featured: false,
    category: "Development",
    modules: [
      {
        id: 1,
        title: "Solidity Basics",
        description: "Introduction to Solidity programming language",
        videoId: "0aJfCug1zTM",
        duration: "48 min",
        order: 1
      },
      {
        id: 2,
        title: "Smart Contract Structure",
        description: "Understanding the components of a smart contract",
        videoId: "k9HYC0EJU6E",
        duration: "42 min",
        order: 2
      }
    ]
  },
  {
    id: 3,
    title: "DeFi Fundamentals",
    description: "Understand the world of Decentralized Finance, including lending, borrowing, and yield farming on the blockchain.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1000",
    level: "Intermediate",
    duration: "5 hours",
    rating: 4.7,
    students: 925,
    instructor: "Michael Johnson",
    featured: true,
    category: "Finance",
    modules: [
      {
        id: 1,
        title: "Introduction to DeFi",
        description: "Understanding the DeFi ecosystem and its components",
        videoId: "BoKKI8arKX8",
        duration: "40 min",
        order: 1
      }
    ]
  },
  {
    id: 4,
    title: "NFT Creation and Marketing",
    description: "Learn how to create, mint, and market Non-Fungible Tokens (NFTs) for digital art and collectibles.",
    image: "https://images.unsplash.com/photo-1645586926869-cb8a0e627631?q=80&w=1000",
    level: "Beginner",
    duration: "4.5 hours",
    rating: 4.6,
    students: 1123,
    instructor: "Emma Williams",
    featured: false,
    category: "Art & Design",
    modules: [
      {
        id: 1,
        title: "NFT Fundamentals",
        description: "Introduction to Non-Fungible Tokens",
        videoId: "wT3764YQDh4",
        duration: "35 min",
        order: 1
      }
    ]
  },
  {
    id: 5,
    title: "Polygon Development Masterclass",
    description: "Become an expert in developing applications on the Polygon network with this comprehensive masterclass.",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000",
    level: "Advanced",
    duration: "8 hours",
    rating: 4.9,
    students: 673,
    instructor: "David Patel",
    featured: true,
    category: "Development",
    modules: [
      {
        id: 1,
        title: "Introduction to Polygon",
        description: "Understanding Polygon's architecture and benefits",
        videoId: "0zM2r4Jb8PA",
        duration: "37 min",
        order: 1
      }
    ]
  }
];

// Course Completion Badge Component
function CourseCompletionBadge({ courseId }: { courseId: number }) {
  // Check if all modules in the course are completed
  const course = courses.find(c => c.id === courseId);
  
  if (!course) return null;
  
  // Create a component to handle each module's completion check
  // This way we don't call hooks in a loop within this component
  return <CourseCompletionBadgeInner course={course} />;
}

// Inner component to handle module completion checks
function CourseCompletionBadgeInner({ course }: { course: typeof courses[0] }) {
  // Track completion status for each module
  const moduleCompletionStatus = course.modules.map(module => {
    const { isCompleted } = useIsVideoCompleted(module.videoId);
    return isCompleted;
  });
  
  // Check if all modules are completed
  const allModulesCompleted = moduleCompletionStatus.every(status => status);
  
  if (allModulesCompleted) {
    return (
      <Badge variant="success" className="absolute top-2 right-2 z-10 px-2 py-1">
        <CheckCircle className="w-3 h-3 mr-1" /> Completed
      </Badge>
    );
  }
  
  return null;
}

// Module Status Badge Component
function ModuleStatusBadge({ videoId }: { videoId: string }) {
  const { isCompleted, isLoading } = useIsVideoCompleted(videoId);
  
  if (isLoading) {
    return <Badge variant="outline">Loading...</Badge>;
  }
  
  return isCompleted ? 
    <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge> : 
    <Badge variant="outline">Not Started</Badge>;
}

const featuredCourses = [
  {
    id: 1,
    title: "Blockchain Fundamentals",
    author: "John Smith",
    level: "Beginner",
    duration: "4 weeks",
    students: 2543,
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=Blockchain+Fundamentals",
    description: "Learn the basics of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptography.",
  },
  {
    id: 2,
    title: "Smart Contract Development",
    author: "Emma Johnson",
    level: "Intermediate",
    duration: "6 weeks",
    students: 1892,
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=Smart+Contracts",
    description: "Master the art of writing secure and efficient smart contracts on Ethereum and other platforms.",
  },
  {
    id: 3,
    title: "Web3 Frontend Development",
    author: "Alex Chen",
    level: "Intermediate",
    duration: "5 weeks",
    students: 1245,
    image: "https://placehold.co/600x400/ef4444/FFFFFF/png?text=Web3+Frontend",
    description: "Build decentralized applications with modern frontend frameworks and blockchain integration.",
  },
];

const categories = [
  "All Courses",
  "Blockchain Basics",
  "Smart Contracts",
  "DeFi",
  "NFTs",
  "Web3 Development",
  "Security",
  "Tokenomics",
];

// Sample learning paths
const learningPaths = [
  {
    id: 1,
    title: "Blockchain Developer",
    courses: 8,
    duration: "6 months",
    level: "Beginner to Advanced",
    image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=Blockchain+Developer",
  },
  {
    id: 2,
    title: "DeFi Specialist",
    courses: 6,
    duration: "4 months",
    level: "Intermediate",
    image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=DeFi+Specialist",
  },
  {
    id: 3,
    title: "NFT Creator",
    courses: 5,
    duration: "3 months",
    level: "Beginner",
    image: "https://placehold.co/600x400/ef4444/FFFFFF/png?text=NFT+Creator",
  },
];

// Sample course counts for categories
const categoryCounts: Record<string, number> = {
  "All Courses": 35,
  "Blockchain Basics": 12,
  "Smart Contracts": 8,
  "DeFi": 15,
  "NFTs": 10,
  "Web3 Development": 18,
  "Security": 7,
  "Tokenomics": 5
};

export default function LearningCenterPage() {
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  // const { isConnected } = useAccount();
  const isConnected = false; // Mock connection state
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const router = useRouter();

  // Function to handle module completion
  const handleModuleComplete = () => {
    toast({
      title: "Module Completed!",
      description: "Your progress has been verified and stored on the blockchain.",
      duration: 5000,
    });
    
    // Move to next module if available
    if (activeCourse && activeModule) {
      const course = courses.find(c => c.id === activeCourse);
      if (course) {
        const currentModuleIndex = course.modules.findIndex(m => m.id === activeModule);
        if (currentModuleIndex < course.modules.length - 1) {
          const nextModule = course.modules[currentModuleIndex + 1];
          setActiveModule(nextModule.id);
          toast({
            title: "Next Module Unlocked",
            description: `Now starting: ${nextModule.title}`,
            duration: 5000,
          });
        } else {
          toast({
            title: "Course Completed!",
            description: "Congratulations on completing the course!",
            duration: 5000,
          });
        }
      }
    }
  };

  const startCourse = (courseId: number, moduleId: number) => {
    setActiveCourse(courseId);
    setActiveModule(moduleId);
  };

  const exitCourseView = () => {
    setActiveCourse(null);
    setActiveModule(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Center</h1>
        <p className="text-gray-600">
          Explore courses, learning paths, and resources to master blockchain technology
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Start Your Blockchain Journey Today</h2>
            <p className="mb-6">
              Learn from industry experts, earn certificates, and build real-world projects with
              our comprehensive learning paths.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/learning-center/course/blockchain-fundamentals"
                className="bg-white text-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Start Learning
              </Link>
              <Link
                href="/dashboard/mentors"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Find a Mentor
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://placehold.co/600x400/FFFFFF/10b981/png?text=Learning+Center"
              alt="Learning Center"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <Link
            href="/learning-center/courses"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View All Courses →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div>{course.duration}</div>
                  <div>{course.students.toLocaleString()} students</div>
                </div>
                <Link
                  href={`/learning-center/course/${course.id}`}
                  className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-medium transition-colors"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Learning Paths</h2>
          <Link
            href="/learning-center/paths"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View All Paths →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <div key={path.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-40 overflow-hidden">
                <img
                  src={path.image}
                  alt={path.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{path.title}</h3>
                <div className="flex flex-col text-sm text-gray-500 space-y-1 mb-4">
                  <div>{path.courses} courses</div>
                  <div>{path.duration}</div>
                  <div>{path.level}</div>
                </div>
                <Link
                  href={`/learning-center/path/${path.id}`}
                  className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-medium transition-colors"
                >
                  View Path
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/learning-center/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white hover:bg-emerald-50 border hover:border-emerald-500 rounded-lg p-6 text-center transition-colors"
            >
              <div className="font-medium">{category}</div>
              <div className="text-sm text-gray-500 mt-1">
                {categoryCounts[category] || 10} courses
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Join thousands of students already learning blockchain development, DeFi, NFTs, and more.
          Get certified and connect with top mentors in the industry.
        </p>
        <Link
          href="/dashboard/learn"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          View My Learning Dashboard
        </Link>
      </div>

      {/* Course View or Course List */}
      {activeCourse === null ? (
        <>
          {/* Featured Courses Section */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => course.featured)
                .map(course => (
                  <Card key={course.id} className="overflow-hidden flex flex-col h-full group hover:shadow-md transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <CourseCompletionBadge courseId={course.id} />
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <Badge className="mb-2 bg-primary/90">{course.category}</Badge>
                          <h3 className="font-bold text-lg">{course.title}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="flex-grow p-5">
                      <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2 text-amber-500" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{course.students} students</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t bg-muted/20">
                      <Button 
                        className="w-full" 
                        onClick={() => startCourse(course.id, course.modules[0].id)}
                      >
                        <Play className="w-4 h-4 mr-2" /> Start Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </section>

          {/* All Courses Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">All Courses</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="design">Art & Design</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <Card key={course.id} className="overflow-hidden flex flex-col h-full">
                      <div className="relative h-40 overflow-hidden">
                        <CourseCompletionBadge courseId={course.id} />
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-grow p-5">
                        <Badge className="mb-2">{course.category}</Badge>
                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{course.level}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 border-t bg-muted/20">
                        <Button 
                          className="w-full" 
                          onClick={() => startCourse(course.id, course.modules[0].id)}
                        >
                          Start Learning
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Category tabs */}
              {["blockchain", "development", "finance", "design"].map(category => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses
                      .filter(course => 
                        course.category.toLowerCase() === category || 
                        (category === "design" && course.category === "Art & Design")
                      )
                      .map(course => (
                        <Card key={course.id} className="overflow-hidden flex flex-col h-full">
                          <div className="relative h-40 overflow-hidden">
                            <CourseCompletionBadge courseId={course.id} />
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="flex-grow p-5">
                            <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{course.level}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{course.duration}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 border-t bg-muted/20">
                            <Button 
                              className="w-full" 
                              onClick={() => startCourse(course.id, course.modules[0].id)}
                            >
                              Start Learning
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </>
      ) : (
        // Course Content View
        <div className="space-y-8">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={exitCourseView}>
              ← Back to Courses
            </Button>
            {isConnected ? (
              <Badge variant="outline" className="px-3 py-1">
                <Award className="w-4 h-4 mr-2" /> Blockchain Verified Learning
              </Badge>
            ) : (
              <ConnectButton />
            )}
          </div>
          
          {/* Course Content */}
          {courses.filter(c => c.id === activeCourse).map(course => (
            <div key={course.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
                
                {/* Active Module */}
                {course.modules.filter(m => m.id === activeModule).map(module => (
                  <div key={module.id} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{module.title}</h2>
                      <p className="text-muted-foreground mb-2">{module.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" /> {module.duration}
                      </div>
                    </div>
                    
                    {/* YouTube Player */}
                    <div className="border rounded-lg overflow-hidden">
                      <YouTubePlayer 
                        videoId={module.videoId}
                        title={module.title}
                        courseId={activeCourse}
                        moduleId={module.id}
                        onComplete={handleModuleComplete}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Instructor</span>
                        <span className="font-medium">{course.instructor}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Level</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Modules</span>
                        <span className="font-medium">{course.modules.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Students</span>
                        <span className="font-medium">{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="font-medium flex items-center">
                          {course.rating} <Star className="w-4 h-4 ml-1 text-amber-500 fill-amber-500" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Module List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Modules</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2">
                    <div className="space-y-1">
                      {course.modules.map((module, index) => (
                        <div 
                          key={module.id}
                          className={`
                            p-3 rounded-md flex items-center justify-between cursor-pointer
                            ${module.id === activeModule ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'}
                          `}
                          onClick={() => setActiveModule(module.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium line-clamp-1">{module.title}</div>
                              <div className="text-xs text-muted-foreground">{module.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ModuleStatusBadge videoId={module.videoId} />
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Certificate Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Certificate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete all modules to earn a blockchain-verified certificate that showcases your knowledge and skills.
                    </p>
                    <div className="flex items-center justify-center p-4 border rounded-md bg-muted/30">
                      <Award className="w-16 h-16 text-primary opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 