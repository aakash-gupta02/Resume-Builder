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

const FeaturesSection = () => {
  return (
    <div>
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-x-2 px-4 py-2 rounded-full bg-white/10 border border-blue-200 shadow-sm text-blue-600 text-sm mb-5 backdrop-blur-sm">
              <BoltIcon className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-gray-900">Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-lg text-gray-600">
              Our platform provides all the tools to create a stunning resume
              that gets noticed by recruiters and hiring managers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CodeBracketIcon,
                title: "Developer Friendly",
                description:
                  "Syntax highlighting for technical skills and GitHub integration.",
              },
              {
                icon: ChartBarIcon,
                title: "ATS Optimized",
                description:
                  "Designed to pass through Applicant Tracking Systems flawlessly.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Privacy Focused",
                description:
                  "Your data stays yours. We don't sell or share your information.",
              },
              {
                icon: DevicePhoneMobileIcon,
                title: "Mobile Ready",
                description:
                  "Edit and share your resume from anywhere, on any device.",
              },
              {
                icon: ArrowsPointingOutIcon,
                title: "One-Click Design",
                description:
                  "Switch between professional templates with a single click.",
              },
              {
                icon: UserGroupIcon,
                title: "Collaboration",
                description:
                  "Invite mentors or peers to review and suggest improvements.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-blue-300   transition-colors shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
