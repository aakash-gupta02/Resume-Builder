'use client';

import React from 'react';
import ResumeTemplate from '@/components/resume/ResumeTemplate';
import ResumeViewport from '@/components/resume/ResumeViewport';
import { useResume } from '@/context/ResumeContext';

const PreviewPage = () => {
  const { resume, customization } = useResume();
  
  return (
    <div className="py-8 px-4 overflow-auto">
      <ResumeViewport>
        <div className="shadow-lg">
          <ResumeTemplate resume={resume} customization={customization} />
        </div>
      </ResumeViewport>
    </div>
  );
};

export default PreviewPage;