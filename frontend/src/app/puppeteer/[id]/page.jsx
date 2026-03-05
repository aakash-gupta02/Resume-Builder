'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ResumeTemplate from '@/components/resume/ResumeTemplate';
import { resumeAPI } from '@/lib/api';

export default function PuppeteerPreviewPage() {
  const params = useParams();
  const { id } = params;

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await resumeAPI.getById(id);
        setResume(response.data.resume || response.data);
      } catch (err) {
        console.error('Error loading resume:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Resume not found</p>
      </div>
    );
  }

  // Get customization from template.styles (where it's stored in DB)
  const customization = resume.template?.styles || {};

  // Clean render for Puppeteer PDF generation
  return (
    <ResumeTemplate 
      resume={resume} 
      customization={customization} 
    />
  );
}
