import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowDownTrayIcon,
  HomeIcon,
  PrinterIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useResume } from "../context/ResumeContext";
import TemplateRenderer from "../components/TemplateRenderer";
import { useAuth } from "../context/AuthContext";
import ResumePromoModal from "../components/ResumePromoModal";
import BackgroundComponent from "../components/BackgroundComponent";
import API from "../api/axiosInstance";

const Preview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setResumeData, resumeData } = useResume();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(false);
  const [promoShown, setPromoShown] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  const fetchResume = async () => {
    try {
      setLoading(true);
      setUnauthorized(false);
      const res = await API.get(`/resume/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumeData(res.data.resume);
    } catch (err) {
      if (err.response?.status === 401) {
        setUnauthorized(true);
      } else {
        console.error("Error loading resume:", err);
        navigate("/");
      }
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

  if (unauthorized) {
    return (
      <BackgroundComponent>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <LockClosedIcon className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Private Resume
            </h2>
            <p className="text-gray-600 mb-6">
              This resume is private and cannot be accessed without permission.
            </p>
            {!user && (
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign in to view your resumes
                </Link>
                <Link
                  to="/register"
                  className="w-full flex justify-center items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Create an account
                </Link>
              </div>
            )}
            {user && (
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </Link>
            )}
          </div>
        </div>
      </BackgroundComponent>
    );
  }

  return (
    <BackgroundComponent>
      <div className="min-h-screen bg-gray-50/40 pb-20">
        <div id="no-print" className="sticky top-0 bg-white shadow-sm z-10">
          <div className="w-full flex justify-center fixed top-0 z-50 py-4 bg-transparent">
            {/* Floating Glass Container */}
            <div className="flex justify-between items-center w-[95%] max-w-7xl px-4 sm:px-8 py-3 rounded-2xl backdrop-blur-xl shadow-lg border border-white/20 font-medium transition-all duration-300 bg-white/30">
              {/* Left Section */}
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <HomeIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate("/")}
                    className="text-lg font-bold text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    JobFolio
                  </button>
                </div>
              )}

              {/* Right Section */}
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="text-sm flex items-center gap-2 border border-blue-600 text-blue-600 px-6 py-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white hover:shadow-md transition-all"
                >
                  Make Yours
                </Link>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full cursor-pointer hover:scale-105 hover:shadow-md hover:bg-blue-700 transition-all"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 ">
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
    </BackgroundComponent>
  );
};

export default Preview;
