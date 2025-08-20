// import { motion } from "framer-motion";
import { FaCode, FaUsers, FaRocket, FaFileDownload } from "react-icons/fa";
import BackgroundComponent from "../components/BackgroundComponent";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
  return (
    <BackgroundComponent>
    <div className="bg-white/50 text-gray-800">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center py-16 px-6">
        About <span className="text-blue-600">Jobfolio</span>
        <p className="text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
          Jobfolio is a modern resume builder created to help developers and job
          seekers craft clean, professional resumes with ease. It’s built with
          React, Node, and modern web technologies — designed to be fast,
          simple, and effective.
        </p>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              As a developer, I realized that creating a resume can be a bigger
              struggle than coding itself. Most tools are either too rigid or
              too cluttered. I wanted something practical: one place where I
              could build, edit, and manage my resumes effortlessly.
              <br />
              <br />
              Jobfolio was born out of that need — a project fueled by my own
              journey of becoming independent, valuing family, and striving for
              financial freedom.
            </p>
          </div>
          <div className="flex justify-center">
            <FaCode className="text-blue-600" size={120} />
          </div>
        </div>
      </section>

      {/* What It Does */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">What Jobfolio Offers</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-white shadow rounded-2xl">
              <FaUsers className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="font-bold mb-2">Simple Resume Creation</h3>
              <p className="text-gray-600 text-sm">
                Fill all details in one place — no clutter, no complexity.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded-2xl">
              <FaRocket className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="font-bold mb-2">Fast & Modern</h3>
              <p className="text-gray-600 text-sm">
                Powered by MERN stack with sleek UI built on React + Tailwind.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded-2xl">
              <FaFileDownload
                className="mx-auto text-blue-600 mb-4"
                size={40}
              />
              <h3 className="font-bold mb-2">Export & Share</h3>
              <p className="text-gray-600 text-sm">
                Download resumes or share them online with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            Jobfolio is not just a tool — it’s a step toward independence. My
            vision is to make resume building accessible, efficient, and
            empowering for every job seeker. I want developers and students like
            me to focus less on formatting and more on opportunities.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Let’s Build Your Future</h2>
        <p className="text-gray-600 mb-6">
          Start creating your professional resume today with Jobfolio.
        </p>
        <a
          onClick={() => navigate('/')}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
        >
          Get Started
        </a>
      </section>
    </div>
    </BackgroundComponent>
  );
}
