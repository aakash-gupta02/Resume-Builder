import React from "react";
import {
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/LandingPage/Navbar";

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white/80 rounded-xl shadow border border-gray-200 hover:shadow-lg transition">
    <div className="bg-blue-100 rounded-full p-3 mb-4">
      <Icon className="h-7 w-7 text-blue-600" />
    </div>
    <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

// Service Card Component
const ServiceCard = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-4 p-5 bg-white/90 rounded-lg border border-blue-100 shadow hover:shadow-md transition">
    <div className="bg-indigo-100 rounded-full p-2">
      <Icon className="h-6 w-6 text-indigo-600" />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:24px_24px] opacity-5 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Blurred Color Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative z-10 container mt-10 mx-auto px-6 py-20 text-center">
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
        <p className="text-blue-600 font-medium mb-10 flex items-center justify-center space-x-2">
          <span className="h-px w-8 bg-blue-600"></span>
          <span>No fluff. Just results.</span>
          <span className="h-px w-8 bg-blue-600"></span>
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
          >
            Get Started
            <ArrowRightIcon className="h-5 w-5" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 border border-blue-200 text-blue-700 rounded-full font-semibold shadow hover:bg-blue-50 transition"
          >
            <PlayIcon className="h-5 w-5 text-blue-500" />
            Watch Demo
          </a>
        </div>
      </section>

      {/* LINK GRID */}
      <section className="relative z-10 container mx-auto px-6 pb-20 max-w-md">
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
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="relative z-10 container mx-auto px-6 py-20"
      >
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ResumeCraft?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unlock your career potential with features designed for modern professionals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={DocumentTextIcon}
            title="Beautiful Templates"
            desc="Choose from stunning, ATS-friendly templates that make your resume stand out."
          />
          <FeatureCard
            icon={UserGroupIcon}
            title="Collaboration"
            desc="Share and collaborate with mentors, friends, or recruiters in real-time."
          />
          <FeatureCard
            icon={CheckCircleIcon}
            title="Instant Feedback"
            desc="Get AI-powered suggestions to improve your resume instantly."
          />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="relative z-10 container mx-auto px-6 py-20"
      >
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to build, polish, and launch your career journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ServiceCard
            icon={BriefcaseIcon}
            title="Resume Builder"
            desc="Create, edit, and export professional resumes in minutes."
          />
          <ServiceCard
            icon={ChatBubbleLeftRightIcon}
            title="Expert Review"
            desc="Get your resume reviewed by industry experts for actionable feedback."
          />
          <ServiceCard
            icon={ShieldCheckIcon}
            title="Privacy First"
            desc="Your data is secure and private. You control what you share."
          />
          <ServiceCard
            icon={RocketLaunchIcon}
            title="One-Click Apply"
            desc="Apply to jobs directly from your dashboard with a single click."
          />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Supercharge Your Career?
          </h3>
          <p className="text-blue-100 mb-8">
            Join thousands of professionals who trust ResumeCraft to land their dream jobs.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-blue-50 transition"
          >
            Get Started Free
            <ArrowRightIcon className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-white/80 border-t border-blue-100 py-8 mt-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
