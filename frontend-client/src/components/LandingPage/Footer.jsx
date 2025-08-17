import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-gray-400 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-white">JobFolio</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Build stunning, professional resumes in minutes with JobFolio’s
              all-in-one resume builder.
            </p>
            <div className="flex space-x-5">
              <a href="#" aria-label="Twitter" className="hover:text-blue-400">
                <FaTwitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-500">
                <FaLinkedin size={18} />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-gray-200">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
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
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                {column.title}
              </h3>
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

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} JobFolio. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
