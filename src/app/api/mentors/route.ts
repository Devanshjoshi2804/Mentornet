import { NextRequest, NextResponse } from "next/server";
import { getMockMentors, getMockMentorById, approveMockMentor, rejectMockMentor } from "@/lib/mockData";

// GET /api/mentors - Get all mentors
export async function GET() {
  try {
    // Use mock data instead of prisma
    const mentors = await getMockMentors();
    
    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentors" },
      { status: 500 }
    );
  }
}

// POST /api/mentors - Create a new mentor
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.wallet || !data.expertise) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // In a real app, this would create a new mentor in the database
    // For now, we'll just mock a successful response
    return NextResponse.json(
      { 
        id: "new-mentor-id", 
        ...data,
        isApproved: false,
        createdAt: new Date().toISOString()
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating mentor:", error);
    return NextResponse.json(
      { error: "Failed to create mentor" },
      { status: 500 }
    );
  }
}

// GET /api/mentors/:id - Get a specific mentor
export async function GET_MENTOR(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const mentor = await getMockMentorById(params.id);
    
    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Error fetching mentor:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentor" },
      { status: 500 }
    );
  }
}

// PUT /api/mentors/:id/approve - Approve a mentor
export async function APPROVE_MENTOR(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await approveMockMentor(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: "Failed to approve mentor" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error approving mentor:", error);
    return NextResponse.json(
      { error: "Failed to approve mentor" },
      { status: 500 }
    );
  }
}

// PUT /api/mentors/:id/reject - Reject a mentor
export async function REJECT_MENTOR(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await rejectMockMentor(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: "Failed to reject mentor" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rejecting mentor:", error);
    return NextResponse.json(
      { error: "Failed to reject mentor" },
      { status: 500 }
    );
  }
} 