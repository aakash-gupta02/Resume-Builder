import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import TemplateRenderer from "../components/TemplateRenderer";
import { useAuth } from "../context/AuthContext";

import API from "../api/axiosInstance";

const PuppetPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setResumeData, resumeData } = useResume();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/resume/get/${id}`);
      setResumeData(res.data.resume);
    } catch (err) {
      console.error("Error loading resume:", err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();

    return () => {
      setResumeData({});
    };
  }, [id, setResumeData, token, navigate, user]);

  return <TemplateRenderer />;
};

export default PuppetPreview;
