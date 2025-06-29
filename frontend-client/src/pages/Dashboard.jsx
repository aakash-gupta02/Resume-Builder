import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    //  if (!token) return;

    const fetchResumes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/resume/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(token);
        console.log("SENDING TOKEN:", token);

        console.log(res.data);
        console.log(res.data.resume);

        setResumes(res.data.resume || []);
      } catch (err) {
        console.error("Failed to load resumes", err);
      }
    };

    fetchResumes();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Resumes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div
            key={resume._id}
            onClick={() => navigate(`/resume/edit/${resume._id}`)}
            className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition-all"
          >
            <h2 className="text-lg font-semibold">{resume.title}</h2>
            <p className="text-sm text-gray-500">
              Created on: {new Date(resume.createdAt).toLocaleDateString()}
            </p>
            {/* Placeholder box for preview */}
            <div className="mt-3 h-20 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              Preview
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
