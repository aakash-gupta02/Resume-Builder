'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ResumeTemplate from '@/components/resume/ResumeTemplate';
import { resumeAPI, pdfAPI } from '@/lib/api';
import { ArrowLeft, Download, Printer, Loader2, Home, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        setUnauthorized(false);
        
        const response = await resumeAPI.getById(id);
        setResume(response.data.resume || response.data);
      } catch (err) {
        console.error('Error loading resume:', err);
        if (err.response?.status === 401) {
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
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

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
    <div className="min-h-screen bg-gray-100">
      {/* Header - Hidden when printing */}
      <div className="print:hidden bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-gray-300">|</span>
            <h1 className="font-semibold text-gray-900">{resume.title || 'Resume Preview'}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleDownload}
              disabled={pdfGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {pdfGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {pdfGenerating ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 print:p-0 print:max-w-none">
        <div className="bg-white shadow-lg print:shadow-none">
          <ResumeTemplate 
            resume={resume} 
            customization={customization} 
          />
        </div>
      </div>
    </div>
  );
}
