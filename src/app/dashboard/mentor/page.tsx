import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Laptop, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MentorPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AI Mentor System</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>AI Chat</CardTitle>
            <CardDescription>Ask questions anytime</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <MessageSquare className="h-8 w-8 text-emerald-500" />
              <Button>Start Chat</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Courses</CardTitle>
            <CardDescription>Your learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Laptop className="h-8 w-8 text-emerald-500" />
              <Button variant="outline">View Courses</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Study Materials</CardTitle>
            <CardDescription>Resources and guides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <BookOpen className="h-8 w-8 text-emerald-500" />
              <Button variant="outline">Explore</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Community</CardTitle>
            <CardDescription>Connect with peers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Users className="h-8 w-8 text-emerald-500" />
              <Button variant="outline">Join</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
        <h2 className="text-xl font-semibold mb-4">Welcome to the AI Mentor System</h2>
        <p className="mb-4">
          Our advanced AI mentor is here to guide you through your learning journey.
          Get personalized support, immediate answers to your questions, and
          tailored recommendations for your blockchain education.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-emerald-500">Start Learning</Button>
          <Button variant="outline">Watch Demo</Button>
        </div>
      </div>
    </div>
  );
} 