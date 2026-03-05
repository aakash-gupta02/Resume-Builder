'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ResumeTemplate from '@/components/resume/ResumeTemplate';
import { resumeAPI, pdfAPI } from '@/lib/api';
import PreviewNavbar from '@/components/preview/PreviewNavbar';
import { Loader2, Home, Lock } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { user, isAuthenticated } = useAuth();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const getUserId = (userData) =>
    userData?._id || userData?.id || userData?.userId || null;

  const getResumeOwnerId = (resumeData) => {
    const owner = resumeData?.user || resumeData?.owner;

    if (typeof owner === 'string') return owner;

    return (
      owner?._id ||
      owner?.id ||
      resumeData?.userId ||
      resumeData?.ownerId ||
      null
    );
  };

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        setUnauthorized(false);
        setIsOwner(false);

        let resumeData = null;

        try {
          if (isAuthenticated) {
            const response = await resumeAPI.getById(id);
            resumeData = response.data.resume || response.data;
          } else {
            const response = await resumeAPI.getPublicById(id);
            resumeData = response.data.resume || response.data;
          }
        } catch (primaryError) {
          const publicResponse = await resumeAPI.getPublicById(id);
          resumeData = publicResponse.data.resume || publicResponse.data;
        }

        if (!resumeData) {
          setError('Resume not found');
          return;
        }

        setResume(resumeData);

        const currentUserId = getUserId(user);
        const resumeOwnerId = getResumeOwnerId(resumeData);
        setIsOwner(
          Boolean(
            isAuthenticated &&
              currentUserId &&
              resumeOwnerId &&
              String(currentUserId) === String(resumeOwnerId)
          )
        );
      } catch (err) {
        console.error('Error loading resume:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setUnauthorized(true);
        } else if (err.response?.status === 404) {
          setError('Resume not found');
        } else {
          setError('Failed to load resume');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, isAuthenticated, user]);

  const handleDownload = async () => {
    if (!resume?._id) return;
    
    setPdfGenerating(true);
    try {
      const response = await pdfAPI.generate(resume._id);
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${resume.title || 'download'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setPdfGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            This resume is private. Please log in to view it.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">No resume data</p>
      </div>
    );
  }

  // Get customization from template.styles (where it's stored in DB)
  const customization = resume.template?.styles || {};

  return (
    <div className="min-h-screen">
      <PreviewNavbar
        title={resume.title}
        showBackButton={isOwner}
        onBack={() => router.back()}
        onDownload={handleDownload}
        pdfGenerating={pdfGenerating}
      />

      {/* Resume Content */}
      <div className="py-8 px-4 print:p-0 overflow-auto">
        <div className="w-fit mx-auto shadow-lg print:shadow-none">
          <ResumeTemplate 
            resume={resume} 
            customization={customization} 
          />
        </div>
      </div>
    </div>
  );
}
