import BackgroundComponent from "@/components/LandingPage/BackgroundComponent";
import Navbar from "@/components/LandingPage/Navbar";
import Link from "next/link";

const highlights = [
    "Full Stack Developer based in Mumbai, India",
    "Focused on scalable backend architecture and system design",
    "Strong with Next.js, Node.js, Express.js, MongoDB, and React",
    "Builds practical tools and production-ready workflows",
];

const projects = [
    {
        name: "JobFolio",
        description:
            "A resume builder for developers with structured editing, live preview, and clean export-ready output.",
    },
    {
        name: "CartFlow",
        description:
            "A backend architecture experiment using microservice-style design, caching, and queue-based workflows.",
    },
    {
        name: "NeatNode",
        description:
            "A CLI starter for production-ready Node.js backends with modular structure and developer-focused defaults.",
    },
];

export default function AboutPage() {
    return (
        <BackgroundComponent>
            <main className="min-h-screen text-gray-900 px-6 py-24">
                <Navbar />
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="mb-10">
                        <p className="inline-flex items-center rounded-full border border-blue-200 px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-50">
                            About the Creator
                        </p>
                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                            Aakash Gupta
                        </h1>
                        <p className="mt-3 text-lg text-gray-600 max-w-3xl leading-relaxed">
                            Full Stack Developer focused on building scalable web applications,
                            backend systems, and developer tools with clean architecture.
                        </p>
                    </div>

                    <section className="grid gap-5 md:grid-cols-2 mb-12">
                        {highlights.map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
                            >
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Notable Personal Projects</h2>
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div
                                    key={project.name}
                                    className="rounded-2xl border border-gray-200 p-5 bg-white"
                                >
                                    <h3 className="text-lg font-semibold text-blue-700">{project.name}</h3>
                                    <p className="text-gray-600 mt-1">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold">Explore full portfolio</h2>
                            <p className="text-gray-600 mt-1">
                                View detailed work experience, projects, and contact details.
                            </p>
                        </div>
                        <Link
                            href="https://aakashgupta02.is-a.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition-colors"
                        >
                            Visit Portfolio
                        </Link>
                    </section>
                </div>
            </main>
        </BackgroundComponent>
    );
}
