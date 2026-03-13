# [Jobfolio - Resume Builder](https://jobfolioo.vercel.app/)

Jobfolio is a full-stack web application that allows users to **create, customize, preview, and export professional resumes** in real time.

The platform provides a structured resume editor, multiple modern templates, and a reliable PDF export system powered by **Puppeteer**, ensuring the generated resume matches the live preview accurately.

The goal of this project was to build a **production-style resume builder**, focusing not only on UI but also on real engineering challenges such as PDF generation, backend rendering, authentication, and deployment.

---

# Features

### Resume Creation & Editing

* Structured resume editor with dedicated sections
* Support for:

  * Profile information
  * Education
  * Experience
  * Projects
  * Skills
  * Achievements
  * Certifications
  * Languages
  * Hobbies
  * Custom links

### Real-Time Preview

* Instant resume preview while editing
* Ensures users see the final layout before exporting

### Resume Templates

Multiple professionally styled templates including: (Coming Soon)

* Classic
* Minimal
* Modern
* Two-column layout
* Narrow layout

Templates are rendered dynamically so the same data can be reused across different designs.

### PDF Export

* High-quality PDF export using **Puppeteer**
* Server-side rendering for accurate layout reproduction
* Maintains styling, fonts, and spacing from the preview

### Resume Sharing

* Generate shareable links (Coming Soon)
* View resumes directly in the browser
* Download resume as PDF

### Authentication System

* Secure login and registration
* JWT-based authentication
* Protected routes for dashboard and editing

### Customization Options

Users can customize several aspects of the resume:

* Template selection (Coming Soon)
* Section ordering (Coming Soon)
* Section visibility
* Content formatting using rich text editor
* Font selection
* Layout adjustments

The system also hides empty sections automatically to keep resumes clean and professional.

### Responsive Design

* Works across desktop and mobile devices
* Responsive resume preview and editor

---

# Screenshots

### Landing Page

<img width="1440" height="780" alt="Image" src="https://github.com/user-attachments/assets/36df1a57-21f0-4261-9fd8-a3e13882abf9" />

### Resume Editor

<img width="1440" height="774" alt="Image" src="https://github.com/user-attachments/assets/1e0583a5-973f-4256-8666-896c1e81475e" />

### PDF Preview

<img width="1440" height="780" alt="Image" src="https://github.com/user-attachments/assets/22a5eaa0-873a-4c08-9655-95b547210cfb" />

### Full Landing Page

[<img width="800" alt="Full Landing Page Preview" src="https://github.com/user-attachments/assets/be603636-2899-4105-9a9a-46bb8bdcd9fa">](https://postimg.cc/pmcXtSrh)

---

# Tech Stack

### Frontend

* Nextjs
* React
* TailwindCSS

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* [NeatNode](https://neatnode.codes)

### Authentication

* JWT
* bcrypt

### PDF Generation

* Puppeteer

### Deployment

* Docker support for backend services

---

# Minimal Architecture

The application follows a **simple full-stack architecture** where the frontend interacts with backend APIs for authentication, resume management, and PDF generation.

```
Client (React)
      │
      │ REST API
      ▼
Node.js / Express Backend
      │
      │ Database Queries
      ▼
MongoDB
```

### PDF Generation Flow

```
User clicks Download PDF
        │
        ▼
Frontend calls backend endpoint
        │
        ▼
Backend launches Puppeteer
        │
        ▼
Puppeteer loads resume preview page
        │
        ▼
Page is rendered in headless Chromium
        │
        ▼
PDF is generated and returned to user
```

This backend rendering approach ensures the PDF layout matches the preview accurately.

---

# Getting Started

## Prerequisites

* Node.js
* MongoDB
* npm
* Docker (optional)

---

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Running the Application

### Start Backend

```bash
npm start
```

or

```bash
npm run dev
```

### Start Frontend

```bash
npm run dev
```

---

## Docker (Optional)

Build and run the backend with Docker:

```bash
docker build -t resume-backend .
docker run -p 5000:5000 resume-backend
```

---

# Challenges I Faced

The most challenging part of this project was implementing **reliable PDF generation**.

### Frontend PDF Issues

Initially, I tried generating PDFs directly in the frontend using libraries like:

* html2pdf
* client-side PDF rendering tools

These solutions worked for simple layouts but became unreliable when handling complex resume structures and responsive designs.

### Switching to Backend Rendering

After researching how production systems handle document generation, I realized that PDF rendering is typically done on the **backend**.

This led me to adopt **Puppeteer**, which allows rendering HTML pages inside a headless Chromium browser.

### Key Problems Solved

**1. Consistent PDF Layout**

Ensuring the exported PDF matched the preview exactly required careful handling of:

* fonts
* page margins
* CSS rendering
* dynamic content

**2. Puppeteer Deployment**

Running Puppeteer inside Docker required installing additional system dependencies so Chromium could run correctly.

**3. MongoDB Atlas Connectivity**

While deploying the backend, I faced issues with:

* IP whitelisting
* MongoDB Atlas connection rules
* version mismatches in Mongoose

Solving these issues improved my understanding of real-world deployment environments.

---

# Purpose of the Project

This project was built to explore and demonstrate:

* Full-stack application architecture
* Real-time UI editing workflows
* Server-side document generation
* Authentication systems
* Production debugging challenges
* Deployment and containerization

---

# Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss what you would like to change.

---

# License

MIT License
