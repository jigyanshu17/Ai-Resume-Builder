import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../../..//db/resumedb'; // Adjust the import path as necessary
import Resume from '../../../../../models/resume.model'; // Adjust the import path as necessary
import { auth } from '@clerk/nextjs/server';

// GET method to fetch a specific resume by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connect(); // Connect to the MongoDB database

  try {
    const { userId } = auth(); // Get the authenticated user's ID

    // Find the resume by ID and ensure it belongs to the authenticated user
    const resume = await Resume.findOne({ _id: params.id, userId: userId });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found or you do not have access" }, { status: 404 });
    }

    return NextResponse.json(resume, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await connect(); // Connect to the MongoDB database
  
    try {
      const { userId } = auth(); // Get the authenticated user's ID
  
      // Find and delete the resume by ID, ensuring it belongs to the authenticated user
      const result = await Resume.findOneAndDelete({ _id: params.id, userId: userId });
  
      if (!result) {
        return NextResponse.json({ error: "Resume not found or you do not have access" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Resume deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
    }
  }