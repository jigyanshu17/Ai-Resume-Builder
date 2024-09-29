"use client";
import { set } from "mongoose";
import { useState, ChangeEvent, FormEvent } from "react";

interface Experience {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
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

interface FormData {
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

const ResumeBuilder = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    summary: "",
    experience: [
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
      },
    ],
    education: [
      {
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
      },
    ],
    skills: [
      { name: "", rating: 0 },
      { name: "", rating: 0 },
      { name: "", rating: 0 },
    ],
  });

  const [summary, setSummary] = useState<string>("");

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchSummary = async (summaryTitle: string) => {
    try {
      const response = await fetch("/api/suggest-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summaryTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();
      console.log(data);
      setSummary(data.summary); // Update state with the summary from the API response
    } catch (error) {
      console.error("Error fetching job title summary:", error);
      return null;
    }
  };

  const handleExperienceChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, experience: newExperience }));
  };

  const handleEducationChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, education: newEducation }));
  };

  const handleSkillChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newSkills = [...formData.skills];
    newSkills[index] = { ...newSkills[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, skills: newSkills }));
  };

  const createResume = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const response = await fetch("/api/create-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    if (!response.ok) {
      console.error("Error creating resume:", await response.json());
    } else {
      const result = await response.json();
      console.log("Resume created:", result);
      alert(
        "Resume created successfully! See the dashborad to view all resumes."
      );
      setFormData({
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
        summary: "",
        experience: [
          {
            title: "",
            companyName: "",
            city: "",
            state: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
          },
        ],
        education: [
          {
            universityName: "",
            startDate: "",
            endDate: "",
            degree: "",
          },
        ],
        skills: [
          { name: "", rating: 0 },
          { name: "", rating: 0 },
          { name: "", rating: 0 },
        ],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Build Your Resume
        </h2>

        <form onSubmit={createResume}>
          {/* Personal Information */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="jobTitle"
                type="text"
                placeholder="jobTitle"
                onChange={handleChange}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                onChange={handleChange}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <textarea
                name="summary"
                placeholder="Summary(Paste suggested summary here)"
                onChange={handleChange}
                className="w-full mb-4 p-3 border rounded-lg"
              />
            </div>
            <div className="w-1/2 text-center border-2 border-blue-300 ">
              <h3 className="text-xl font-bold mb-4">Job Title Summary</h3>
              <button
                type="button"
                onClick={() => fetchSummary(formData.jobTitle)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Suggest Summary
              </button>
              <p className="m-5 text-left">{summary}</p>
            </div>
          </div>

          {/* Work Experience */}
          <div className="flex flex-col items-center mt-8">
            <h3 className="text-xl font-bold mb-4 ">Work Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="max-w-xl">
                <input
                  name="title"
                  type="text"
                  placeholder="Job Title"
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full mb-4 p-3 border rounded-lg"
                />
                <input
                  name="companyName"
                  type="text"
                  placeholder="Company Name"
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full mb-4 p-3 border rounded-lg"
                />
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full mb-4 p-3 border rounded-lg"
                />
                <input
                  name="state"
                  type="text"
                  placeholder="State"
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full mb-4 p-3 border rounded-lg"
                />
                <input
                  name="startDate"
                  type="text"
                  placeholder="Start Date"
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full mb-4 p-3 border rounded-lg"
                />
                <input
                  name="endDate"
                  type="text"
                  placeholder="End Date"
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full mb-4 p-3 border rounded-lg"
                />
              </div>
            ))}
          </div>


          {/* Education */}
          <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="max-w-xl">
              <input
                name="degree"
                type="text"
                placeholder="Degree"
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="universityName"
                type="text"
                placeholder="University Name"
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="startDate"
                type="text"
                placeholder="Start Date"
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="endDate"
                type="text"
                placeholder="End Date"
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full mb-4 p-3 border rounded-lg"
              />
            </div>
          ))}
</div>
          {/* Skills */}
          <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index} className="max-w-2xl">
              <input
                name="name"
                type="text"
                placeholder="Skill Name"
                onChange={(e) => handleSkillChange(index, e)}
                className="w-full mb-4 p-3 border rounded-lg"
              />
              <input
                name="rating"
                type="number"
                placeholder="Skill Rating (0-100)"
                onChange={(e) => handleSkillChange(index, e)}
                className="w-full mb-4 p-3 border rounded-lg"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Finish
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeBuilder;
