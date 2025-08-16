import React from 'react'
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
    <div>      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your resume?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals who've accelerated their careers
              with ResumeCraft.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Get Started for Free <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="px-6 py-3 bg-transparent text-white font-medium rounded-lg hover:bg-blue-700 transition-colors border border-white flex items-center gap-2"
              >
                <PlayIcon className="h-4 w-4" />
                Watch Demo
              </a>
            </div>
          </div>
        </div>
      </section></div>
  )
}

export default CTA