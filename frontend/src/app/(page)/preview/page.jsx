'use client';

import React from 'react';
import ResumeTemplate from '@/components/resume/ResumeTemplate';
import { useResume } from '@/context/ResumeContext';

const PreviewPage = () => {
  const { resume, customization } = useResume();
  
  return (
    <ResumeTemplate resume={resume} customization={customization} />
  );
};

export default PreviewPage;