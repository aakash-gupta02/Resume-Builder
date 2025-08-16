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
import Navbar from "../components/LandingPage/Navbar";
import HeroResume from "../components/LandingPage/HeroResume";
import AppleTerminal from "../components/LandingPage/AppleTerminal";
import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesSection from "../components/LandingPage/FeaturesSection";
import StatsSection from "../components/LandingPage/StatsSection";
import TemplateSection from "../components/LandingPage/TemplateSection";

const LandingPage = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Grid Background Pattern */}
      <div
        className="fixed inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:24px_24px] opacity-5"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Blurred Color Blobs */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-30" />
      <div className="fixed bottom-20 left-1/4 w-80 h-80 bg-purple-400 rounded-full blur-3xl opacity-20" />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Template Showcase */}
     <TemplateSection />

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
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
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <DocumentTextIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  ResumeCraft
                </span>
              </div>
              <p className="text-sm mb-4">
                The most powerful resume builder for professionals.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub", "Instagram"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {social}
                    </a>
                  )
                )}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Templates", "Pricing", "Integrations"],
              },
              {
                title: "Resources",
                links: ["Blog", "Guides", "Help Center", "Community"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Privacy", "Terms"],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="text-white font-medium mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © 2023 ResumeCraft. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
