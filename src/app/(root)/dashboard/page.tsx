"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
interface Resume {
    id: string;
    title: string;
    createdAt: string;
    }
const Dashboard = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  // Fetch resumes from backend (replace with your API)
  useEffect(() => {
    const fetchResumes = async () => {
      const res = await fetch('/api/resumes');  // API endpoint to fetch resumes
      const data = await res.json();
      setResumes(data);
    };
    
    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Your Resumes</h2>

        {/* Action to create a new resume */}
        <div className="text-center mb-6">
          <Link href="/resume/create">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">Create New Resume</div>
          </Link>
        </div>

        {/* List of resumes */}
        {resumes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume, index) => (
              <div key={resume.id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{resume.title || `Resume ${index + 1}`}</h3>
                <p className="text-gray-600 mb-4">Created on: {new Date(resume.createdAt).toLocaleDateString()}</p>
                <div className="flex space-x-4">
                  {/* View Resume */}
                  <Link href={`/resume/${resume.id}`}>
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">View</div>
                  </Link>
                  {/* Edit Resume */}
                  <Link href={`/resume/edit/${resume.id}`}>
                    <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Edit</div>
                  </Link>
                  {/* Delete Resume */}
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You don't have any resumes yet.</p>
        )}
      </div>
    </div>
  );
};

// Delete function to remove a resume (replace with your API)
const handleDelete = async (id:string) => {
  if (confirm('Are you sure you want to delete this resume?')) {
    await fetch(`/api/resumes/${id}`, { method: 'DELETE' });  // API call to delete resume
    location.reload();  // Reload page after deletion
  }
};

export default Dashboard;
