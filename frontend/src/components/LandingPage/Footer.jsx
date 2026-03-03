import React from "react";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
return (
  <footer className="bg-white/30 text-gray-800 py-12 px-6 rounded-lg shadow-sm border-t border-gray-200 m-4">
    <div className="max-w-6xl mx-auto">
      {/* Main footer content */}
      <div className="grid md:grid-cols-2 gap-10 mb-8">
        
        {/* About section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">About This Project</h3>
          <p className="text-sm leading-relaxed text-gray-600 mb-4">
            This resume builder was created to help developers showcase their skills and 
            experience in a professional format. Built with React and modern web technologies.
          </p>
        </div>
        
        {/* Connect section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Let's Connect</h3>
          <p className="text-sm text-gray-600 mb-4">
            I'm always interested in new opportunities and collaborations.
          </p>
          <div className="flex space-x-4 mb-4">
            <a 
              href="https://github.com/aakash-gupta02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/aakash-gupta-5a337928b" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://x.com/AakashG99795" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a 
              href="mailto:aakashgupta052004@gmail.com"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
          <Link 
            href="/resume/preview/689a1c11bbb7bab568b7e203" 
            className="inline-flex items-center text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Download My Resume
          </Link>
        </div>
      </div>
      
      {/* Copyright section */}
      <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 mb-4 md:mb-0">
          © {currentYear} Made with ❤️ by Aakash
        </p>
        <div className="flex space-x-6 text-sm">
          <a href="#privacy" className="text-gray-500 hover:text-gray-900 transition-colors">
            Privacy
          </a>
          <a href="#terms" className="text-gray-500 hover:text-gray-900 transition-colors">
            Terms
          </a>
          <a href="#contact" className="text-gray-500 hover:text-gray-900 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>
);

};

export default Footer;

