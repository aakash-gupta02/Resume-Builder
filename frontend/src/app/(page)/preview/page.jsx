'use client';

import React from 'react';
import ResumeTemplate from '@/components/resume/ResumeTemplate';
import { useResume } from '@/context/ResumeContext';

const PreviewPage = () => {
  const { resume, customization } = useResume();
  
  return (
    <div className="py-8 px-4 overflow-auto">
      <div className="w-fit mx-auto shadow-lg">
        <ResumeTemplate resume={resume} customization={customization} />
      </div>
    </div>
  );
};

export default PreviewPage;