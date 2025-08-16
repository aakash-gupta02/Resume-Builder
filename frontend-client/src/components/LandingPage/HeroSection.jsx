import React from 'react'
import Navbar from './Navbar'
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

const HeroSection = () => {
  return (
    <div>
          <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <Navbar />

        <div className="relative z-10 container mt-10 mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-x-2 px-4 py-2 rounded-full bg-white/10 border border-blue-200 shadow-sm text-blue-600 text-sm mb-8 backdrop-blur-sm hover:bg-blue-50 transition-colors">
            <SparklesIcon className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-gray-900">
              Your Success Metric!
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="block">Build. Share. Dominate.</span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Career Journey
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            The most powerful resume builder for professionals, developers, and
            career changers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Create Your Resume <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 flex items-center gap-2"
            >
              <PlayIcon className="h-4 w-4 text-blue-600" />
              Watch Demo
            </a>
          </div>

          <p className="text-blue-600 font-medium mb-10 flex items-center justify-center space-x-2">
            <span className="h-px w-8 bg-blue-600"></span>
            <span>No fluff. Just results.</span>
            <span className="h-px w-8 bg-blue-600"></span>
          </p>
        </div>

        {/* Link Grid */}
        {/* <div className="relative z-10 container mx-auto px-6 pb-20 ">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-center mb-6">
              <p className="text-sm font-mono text-gray-500">
                ResumeCraft/yourname.com
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                "Portfolio",
                "GitHub",
                "Twitter",
                "LinkedIn",
                "Projects",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="p-3 text-center text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>


          </div>
        </div> */}

        {/* <AppleTerminal>
          <HeroResume />
        </AppleTerminal> */}

        {/* <HeroResume /> */}
      </section>
    </div>
  )
}

export default HeroSection