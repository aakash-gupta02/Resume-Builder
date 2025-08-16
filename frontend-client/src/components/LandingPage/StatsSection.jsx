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

const StatsSection = () => {
  return (
    <div>
            <section className="relative py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                number: "10x",
                title: "More Interviews",
                description: "Users report significantly more callbacks",
              },
              {
                number: "98%",
                title: "ATS Success",
                description: "Of resumes pass tracking systems",
              },
              {
                number: "50K+",
                title: "Happy Users",
                description: "Building resumes with our platform",
              },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {stat.title}
                </h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default StatsSection