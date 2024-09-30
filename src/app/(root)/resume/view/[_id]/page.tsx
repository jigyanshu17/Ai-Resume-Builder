"use client";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Experience {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
}

interface Education {
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
}

interface Skill {
  name: string;
  rating: number;
}

interface ResumeData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

const Page = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const { _id } = useParams(); // Use useParams to get the dynamic ID

  useEffect(() => {
    const fetchResume = async () => {
      if (_id) {
        const response = await fetch(`/api/resumes/${_id}`);
        if (response.ok) {
          const data: ResumeData = await response.json();
          setResumeData(data);
        } else {
          console.error("Failed to fetch resume data");
        }
      }
    };

    fetchResume();
  }, [_id]);

  const generateResumePDF = (resumeData: ResumeData): void => {
    const {
      firstName,
      lastName,
      jobTitle,
      address,
      phone,
      email,
      summary,
      experience,
      education,
      skills,
    } = resumeData;
  
    const doc = new jsPDF();
  
    // Set Title
    doc.setFontSize(22);
    doc.text(`${firstName} ${lastName}`, 20, 20);
  
    // Job Title
    doc.setFontSize(16);
    doc.text(jobTitle, 20, 30);
  
    // Contact Information
    doc.setFontSize(12);
    doc.text(`Address: ${address}`, 20, 40);
    doc.text(`Phone: ${phone}`, 20, 50);
    doc.text(`Email: ${email}`, 20, 60);
  
    // Summary
    doc.setFontSize(14);
    doc.text("Summary:", 20, 80);
    doc.setFontSize(12);
    const summaryLines = doc.splitTextToSize(summary, 180); // Adjust width as needed
    const summaryHeight = summaryLines.length * 10; // Assuming 10 units per line height
    doc.text(summaryLines, 20, 90); // Draw the lines starting at the specified position
  
    // Calculate the Y position for the Experience section
    let experienceY = 90 + summaryHeight + 10; // Adding an extra 10 for spacing
  
    // Experience
    doc.setFontSize(14);
    doc.text("Experience:", 20, experienceY);
    experience.forEach((exp, index) => {
      const endDate = exp.currentlyWorking ? "Present" : exp.endDate;
      doc.setFontSize(12);
      const experienceLine = `${exp.title} at ${exp.companyName}, ${exp.city}, ${exp.state} (${exp.startDate} - ${endDate})`;
      const experienceLineHeight = doc.getTextDimensions(experienceLine).h;
      
      doc.text(experienceLine, 20, experienceY + (index + 1) * experienceLineHeight);
    });
  
    // Calculate Y position for the Education section
    let educationY = experienceY + (experience.length + 1) * 10; // Adding an extra 10 for spacing
  
    // Education
    doc.setFontSize(14);
    doc.text("Education:", 20, educationY);
    education.forEach((edu, index) => {
      doc.setFontSize(12);
      const educationLine = `${edu.degree} from ${edu.universityName} (${edu.startDate} - ${edu.endDate})`;
      doc.text(educationLine, 20, educationY + (index + 1) * 10);
    });
  
    // Calculate Y position for the Skills section
    let skillsY = educationY + (education.length + 1) * 10; // Adding an extra 10 for spacing
  
    // Skills
    doc.setFontSize(14);
    doc.text("Skills:", 20, skillsY);
    doc.setFontSize(12);
    doc.text(
      skills.map(skill => `${skill.name} (Rating: ${skill.rating})`).join(", "),
      20,
      skillsY + 10 // Adjust Y position for skills
    );
  
    // Save the PDF
    doc.save(`${firstName}_${lastName}_Resume.pdf`);
  };
  
  return (
    <div>
      {resumeData ? (
        <div className="mt-24 flex items-center justify-center">
          <button className="text-white bg-blue-600 p-2" onClick={() => generateResumePDF(resumeData)}>
            Download Resume
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

};

export default Page;
