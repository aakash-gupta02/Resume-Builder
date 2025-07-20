import { useEffect, useRef } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import axios from "axios";


import { useResume } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";
import ResumePreview from "../components/resume/ResumePreview";

const Preview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setResumeData, resumeData } = useResume();
  const { token } = useAuth();

  const printref = useRef(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/resume/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResumeData(res.data.resume);
      } catch (err) {
        console.error("Error loading resume:", err);
      }
    };

    fetchResume();
    return () => {
      setResumeData({});
    };
  }, [id, setResumeData]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="bg-gray-200/50">
      <div id="no-print" className="mt-10 text-center space-y-4">
        <p className="text-lg font-semibold text-gray-800">
          🎉 Your resume is ready!
        </p>
        <p className="text-sm text-gray-600">
          Review it carefully. If all looks good, hit the button below to
          download your professional resume as PDF.
        </p>
        <button
          onClick={handleDownload}
          className="m-2 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-all duration-200"
        >
          Download Resume
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="m-2 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-all duration-200"
        >
          Dashboard{" "}
        </button>
      </div>

      <div id="yes-print">
        <ResumePreview />
      </div>
    </div>
  );
};

export default Preview;
