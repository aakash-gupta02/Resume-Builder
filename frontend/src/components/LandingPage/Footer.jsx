import React from "react";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "https://aakashgupta02.is-a.dev/", external: true },
    { name: "GitHub", href: "https://github.com/aakash-gupta02", external: true },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="relative backdrop-blur-xl text-gray-800 pt-20 pb-10 px-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white/60 m-6 overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 mb-16">

          {/* About section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">
                About JobFolio
              </h3>
              <p className="text-[15px] leading-relaxed text-gray-600 max-w-md">
                JobFolio is a personal learning project by Aakash Gupta. It helps developers
                build structured resumes with live preview and clean export-ready layouts.
              </p>
            </div>

            <div className="flex space-x-4">
              {[
                { icon: <Github size={20} />, href: "https://github.com/aakash-gupta02" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/aakash-gupta-5a337928b" },
                { icon: <Twitter size={20} />, href: "https://x.com/AakashG99795" },
                { icon: <Mail size={20} />, href: "mailto:aakashgupta052004@gmail.com" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white border border-gray-100 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Connect section */}
          <div className="flex flex-col md:items-end justify-center">
            <div id="contact" className="w-full md:max-w-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Let&apos;s Connect</h3>
              <p className="text-sm text-gray-500 mb-6">
                I&apos;m always open to collaboration, backend-focused projects, and developer tooling ideas.
              </p>

              <Link
                href="/resume/preview/689a1c11bbb7bab568b7e203"
                className="group relative inline-flex items-center justify-center w-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                View My Resume
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation & Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200/50 gap-6">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <a key={link.name} href={link.href} className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                  {link.name}
                </a>
              )
            )}
          </nav>
          <p className="text-xs font-medium text-gray-400">
            © {currentYear} Built by <span className="text-gray-900 font-bold">Aakash Gupta</span>
          </p>
        </div>
      </div>

      {/* Big Background Branding */}
      <div className="absolute -bottom-10 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden">
        <h1
          className="text-[16vw] font-extrabold tracking-tight leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(37, 99, 235, 0.15)", // soft blue outline
            letterSpacing: "-0.03em",
            fontFamily: "Poppins, system-ui, sans-serif",
          }}
        >
          JOBFOLIO
        </h1>
      </div>
    </footer>
  );
};

export default Footer;