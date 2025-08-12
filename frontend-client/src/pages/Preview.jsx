import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowDownTrayIcon,
  HomeIcon,
  PrinterIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useResume } from "../context/ResumeContext";
import TemplateRenderer from "../components/TemplateRenderer";
import { useAuth } from "../context/AuthContext";
import ResumePromoModal from "../components/ResumePromoModal";

const Preview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setResumeData, resumeData } = useResume();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(false);
  const [promoShown, setPromoShown] = useState(false);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/resume/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumeData(res.data.resume);
    } catch (err) {
      console.error("Error loading resume:", err);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchResume();

      if (!user && !promoShown) {
        const timer = setTimeout(() => {
          setShowPromo(true);
          setPromoShown(true);
        }, 10000);

        return () => clearTimeout(timer);
      }
    };

    fetchData();

    return () => {
      setResumeData({});
    };
  }, [id, setResumeData, token, navigate, user, promoShown]);

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 mx-auto bg-blue-200 rounded-full mb-4"></div>
          <p className="text-gray-600">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div id="no-print" className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>JobFolio</span>
                </button>
              </div>
            )}

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div id="no-print" className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {resumeData?.title || "My Resume"}
          </h1>
          <p className="text-gray-600">
            {user
              ? "Review your resume below. It will look exactly like this when downloaded."
              : "You're viewing a shared resume"}
          </p>
        </div>

        <div
          id="yes-print"
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <TemplateRenderer />
        </div>

        {user && (
          <div id="no-print" className="mt-8 text-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              <PrinterIcon className="h-5 w-5" />
              <span>Download Resume as PDF</span>
            </button>
          </div>
        )}
      </div>

      {showPromo && <ResumePromoModal onClose={() => setShowPromo(false)} />}
    </div>
  );
};

export default Preview;
