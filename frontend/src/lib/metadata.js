const SITE_URL = "https://jobfolioo.vercel.app";

export const siteConfig = {
  name: "JobFolio",
  title: "JobFolio | Resume Builder",
  description:
    "Create ATS-friendly, professional resumes with live preview, smart editing, and fast PDF export.",
  url: SITE_URL,
  ogImage: "/meta/opengraph-image.png",
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [{ url: "/icons/favicon.ico" }],
  },
  manifest: "/icons/site.webmanifest",
  themeColors: {
    light: "#ffffff",
    dark: "#111827",
  },
  author: {
    name: "Aakash Gupta",
    twitter: "@AakashG99795",
    github: "aakash-gupta02",
    linkedin: "aakash-gupta-5a337928b",
    email: "aakashgupta052004@gmail.com",
  },
  keywords: [
    "resume builder",
    "jobfolio",
    "resume maker",
    "cv builder",
    "ats resume",
    "professional resume",
    "nextjs",
  ],
};

const allowAllRobots = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const pageMetadata = {
  "/": {
    title: "JobFolio | Build Professional Resumes",
    description:
      "Build polished, ATS-friendly resumes in minutes with live editing and real-time preview.",
    keywords: ["home", "resume builder", "online cv"],
    ogImage: "/meta/home-og.png",
    twitterCard: "summary_large_image",
  },
  "/about": {
    title: "About JobFolio",
    description:
      "Learn about JobFolio, the resume builder focused on clean design, strong structure, and export-ready resumes.",
    keywords: ["about", "jobfolio", "resume product"],
    ogImage: "/meta/about-og.png",
  },
  "/login": {
    title: "Sign In | JobFolio",
    description: "Log in to your JobFolio account and continue building your resume.",
    keywords: ["login", "sign in", "resume dashboard"],
    ogImage: "/meta/login-og.png",
  },
  "/register": {
    title: "Create Account | JobFolio",
    description: "Create a JobFolio account to start building and managing your resumes.",
    keywords: ["register", "sign up", "create account"],
    ogImage: "/meta/register-og.png",
  },
  "/dashboard": {
    title: "Dashboard | JobFolio",
    description: "Manage all your resumes, create new ones, and keep your portfolio updated.",
    keywords: ["dashboard", "resume manager", "my resumes"],
    ogImage: "/meta/dashboard-og.png",
  },
  "/editor/[id]": {
    title: "Resume Editor | JobFolio",
    description: "Edit resume sections, customize styles, and preview your resume in real time.",
    keywords: ["editor", "resume customization", "resume content"],
    ogImage: "/meta/editor-og.png",
  },
  "/preview": {
    title: "Resume Preview | JobFolio",
    description: "Preview your current resume draft before sharing or exporting.",
    keywords: ["preview", "resume preview"],
    ogImage: "/meta/preview-og.png",
  },
  "/preview/[id]": {
    title: "Shared Resume Preview | JobFolio",
    description: "View a resume preview generated with JobFolio.",
    keywords: ["shared resume", "resume link", "resume preview"],
    ogImage: "/meta/preview-og.png",
  },
  "/puppeteer/[id]": {
    title: "Resume Render | JobFolio",
    description: "Internal page used to render resumes for PDF generation.",
    keywords: ["puppeteer", "pdf", "resume render"],
    ogImage: "/meta/preview-og.png",
  },
};

function resolvePageMetadata(pathname) {
  return pageMetadata[pathname] || pageMetadata["/"];
}

export function generateMetadata(pathname = "/") {
  const pageMeta = resolvePageMetadata(pathname);
  const title = pageMeta.title || siteConfig.title;
  const description = pageMeta.description || siteConfig.description;
  const image = pageMeta.ogImage || siteConfig.ogImage;
  const canonicalPath = pathname === "/" ? "" : pathname;
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: pageMeta.keywords || siteConfig.keywords,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    category: "technology",
    classification: "Resume Builder",
    icons: siteConfig.icons,
    manifest: siteConfig.manifest,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || "summary_large_image",
      title,
      description,
      creator: siteConfig.author.twitter,
      images: [image],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
      },
    },
    robots: pageMeta.robots || allowAllRobots,
    other: {
      "msapplication-TileColor": siteConfig.themeColors.light,
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": siteConfig.name,
      "mobile-web-app-capable": "yes",
      "application-name": siteConfig.name,
    },
  };
}

export function generateViewport() {
  return {
    themeColor: [
      {
        media: "(prefers-color-scheme: light)",
        color: siteConfig.themeColors.light,
      },
      {
        media: "(prefers-color-scheme: dark)",
        color: siteConfig.themeColors.dark,
      },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
    colorScheme: "light dark",
  };
}
