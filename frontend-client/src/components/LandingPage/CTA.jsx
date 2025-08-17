import React from "react";
import {
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ArrowsPointingOutIcon,
  UserGroupIcon,
  BoltIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const CTA = () => {
  return (
    <div className=" py-16 bg-white/40">
      {/* <div className="bg-white py-16"> */}
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 shadow-sm text-blue-600 text-sm mb-5 backdrop-blur-sm">
            <SparklesIcon className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-blue-700">Let Magic Happen!</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your resume?
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of professionals who've accelerated their careerswith
            ResumeCraft.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Get Started for Free <ArrowRightIcon className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 flex items-center gap-2"
          >
            <PlayIcon className="h-4 w-4 text-blue-600" />
            Watch Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;
