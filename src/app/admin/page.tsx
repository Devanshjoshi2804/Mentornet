import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPendingMentors } from '@/lib/mentorUtils';
import { Badge } from '@/components/ui/badge';

// Mock function for admin dashboard
export default async function AdminDashboard() {
  // Get pending mentors
  const pendingMentors = await getPendingMentors();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Mentors</CardTitle>
            <CardDescription>Total registered mentors</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">24</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Mentors awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{pendingMentors.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Current mentor-student sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Mentor Approvals</CardTitle>
          <CardDescription>
            Verify and approve new mentor registrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-2">Name</th>
                  <th className="text-left py-4 px-2">Expertise</th>
                  <th className="text-left py-4 px-2">Wallet Address</th>
                  <th className="text-left py-4 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingMentors.length > 0 ? (
                  pendingMentors.map((mentor) => (
                    <tr key={mentor.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-2">{mentor.name}</td>
                      <td className="py-4 px-2">
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="font-mono text-sm">
                          {mentor.address.substring(0, 6)}...{mentor.address.substring(mentor.address.length - 4)}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex gap-2">
                          <form action="/api/admin/approve" method="POST">
                            <input type="hidden" name="mentorId" value={mentor.id} />
                            <Button type="submit" variant="default" size="sm">
                              Approve
                            </Button>
                          </form>
                          <form action="/api/admin/reject" method="POST">
                            <input type="hidden" name="mentorId" value={mentor.id} />
                            <Button type="submit" variant="destructive" size="sm">
                              Reject
                            </Button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No pending mentors to approve
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 