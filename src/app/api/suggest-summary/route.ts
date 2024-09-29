import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { summaryTitle } = await req.json();

    const prompt = `Create a summary for the job title "${summaryTitle}" . The summary should be 3-5 sentences long .`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;

    // Ensure the response is text
    const text = await response.text(); // Await the text extraction

    return NextResponse.json({ summary: text }); // Return summary as JSON
  } catch (err) {
    // Type guard to check if err has a message property
    console.error("An unexpected error occurred:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "An unexpected error occurred" }, { status: 500 });
  }
}
