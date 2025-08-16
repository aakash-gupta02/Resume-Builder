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

const TemplateSection = () => {
  return (
    <div> <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-x-2 px-4 py-2 rounded-full bg-white/10 border border-blue-200 shadow-sm text-blue-600 text-sm mb-5 backdrop-blur-sm">
              <SparklesIcon className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-gray-900">Templates</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professionally designed templates
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our collection of modern, elegant, and effective
              resume templates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Modern",
              "Executive",
              "Minimalist",
              "Creative",
              "Technical",
              "Academic",
            ].map((template, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                  <DocumentTextIcon className="h-16 w-16 text-blue-600 opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {template}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Perfect for {template.toLowerCase()} professionals
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 font-medium flex items-center gap-1 text-sm"
                  >
                    Preview template <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></div>
  )
}

export default TemplateSection