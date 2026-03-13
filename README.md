# Resume Builder

A full-stack web application for creating, editing, and sharing professional resumes. Built with a React frontend and Node.js/Express backend, this project allows users to design beautiful resumes, preview them in real-time, and export them as PDFs using Puppeteer.

---

## Features

- **User Authentication**: Secure registration and login system.
- **Resume Editor**: Intuitive drag-and-drop editor with multiple customizable sections (Education, Experience, Skills, Projects, etc.).
- **Multiple Templates**: Choose from a variety of modern and classic resume templates.
- **Live Preview**: Instantly preview your resume as you edit.
- **PDF Export**: Generate high-quality PDF versions of your resume using Puppeteer.
- **Share & Download**: Share your resume via a link or download it directly.
- **Protected Routes**: User dashboard and resume editing are protected for authenticated users only.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.

---

## Screenshots

### Landing Page
<img width="1440" height="780" alt="Image" src="https://github.com/user-attachments/assets/36df1a57-21f0-4261-9fd8-a3e13882abf9" />

### Resume Editor
<img width="1440" height="774" alt="Image" src="https://github.com/user-attachments/assets/1e0583a5-973f-4256-8666-896c1e81475e" />

### PDF Preview
<img width="1440" height="780" alt="Image" src="https://github.com/user-attachments/assets/22a5eaa0-873a-4c08-9655-95b547210cfb" />

### Full Landing Page
[<img width="800" alt="Full Landing Page Preview" src="https://github.com/user-attachments/assets/be603636-2899-4105-9a9a-46bb8bdcd9fa">](https://postimg.cc/pmcXtSrh)

---

## Tech Stack

- **Frontend**: React, Vite, Axios, Quill Editor
- **Backend**: Node.js, Express, MongoDB, Puppeteer
- **Authentication**: JWT, bcrypt
- **PDF Generation**: Puppeteer
- **Containerization**: Docker

---

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB
- Docker (optional)

### Installation

#### Backend
```bash
cd backend-server
npm install
```

#### Frontend
```bash
cd frontend-client
npm install
```

### Running the App

#### Backend
```bash
npm start
# or
npx nodemon index.js
```

#### Frontend
```bash
npm run dev
```

### Docker (Optional)
Build and run the backend with Docker:
```bash
docker build -t resume-backend .
docker run -p 5000:5000 resume-backend
```

---


## Folder Structure

```
Resume Builder/
│
├── backend-server/         # Node.js/Express backend
│   ├── Dockerfile
│   ├── index.js
│   ├── install-puppeteer.js
│   ├── package.json
│   ├── puppeteer-config.js
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   ├── auth.controller.js
│   │   └── resumeController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── resumeModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── puppeterRoute.js
│   │   ├── resumeRoute.js
│   │   └── userRoute.js
│   └── ...
│
├── frontend-client/        # React frontend (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── favicon.ico
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── api/
│   │   │   └── axiosInstance.jsx
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── BackgroundComponent.jsx
│   │   │   ├── CollapsibleSection.jsx
│   │   │   ├── InfoModal.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── QuillEditor.jsx
│   │   │   ├── ResumeEditor.jsx
│   │   │   ├── ResumeForm.jsx
│   │   │   ├── ResumeNavbar.jsx
│   │   │   ├── ResumePromoModal.jsx
│   │   │   ├── ShareModal.jsx
│   │   │   ├── TemplateRenderer.jsx
│   │   │   ├── Test.jsx
│   │   │   ├── LandingPage/
│   │   │   │   ├── AppleTerminal.jsx
│   │   │   │   ├── CTA.jsx
│   │   │   │   ├── FeaturesSection.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── HeroResume.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── StatsSection.jsx
│   │   │   │   └── TemplateSection.jsx
│   │   │   ├── resume/
│   │   │   │   ├── AchievementsSection.jsx
│   │   │   │   ├── CertificationsSection.jsx
│   │   │   │   ├── ContactLinkSection.jsx
│   │   │   │   ├── EducationSection.jsx
│   │   │   │   ├── ExperienceSection.jsx
│   │   │   │   ├── HobbiesSection.jsx
│   │   │   │   ├── LanguagesSection.jsx
│   │   │   │   ├── MyResumePDF.jsx
│   │   │   │   ├── ProfileInfoSection.jsx
│   │   │   │   ├── ProfileSection.jsx
│   │   │   │   ├── ProjectsSection.jsx
│   │   │   │   ├── ResumePreview.jsx
│   │   │   │   └── SkillsSection.jsx
│   │   │   └── templates/
│   │   │       ├── Classic.jsx
│   │   │       ├── Classic2.jsx
│   │   │       ├── index.jsx
│   │   │       ├── Minimal.jsx
│   │   │       ├── Modern.jsx
│   │   │       ├── Modern2.jsx
│   │   │       ├── ModernTwo-ColumnResume.jsx
│   │   │       └── Narrow.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ResumeContext.jsx
│   │   └── pages/
│   │       ├── AboutUs.jsx
│   │       ├── CreateResume.jsx
│   │       ├── Dashboard.jsx
│   │       ├── HomePage.jsx
│   │       ├── login.jsx
│   │       ├── Preview.jsx
│   │       ├── PuppetPreview.jsx
│   │       ├── register.jsx
│   │       └── ResumeEditPage.jsx
│   └── ...
│
├── puppeteer_trial/        # Puppeteer PDF generation experiments
│   ├── index.js
│   ├── package.json
│   ├── resume.html
│   ├── resume.pdf
│   └── resume1.pdf
└── ...
```

## Challenges I Faced

The backend and frontend development were relatively smooth, but the real challenges started when I implemented the **PDF download feature**.

- At first, I tried frontend-based solutions for generating PDFs. While they worked to some extent, they produced unexpected behaviors and inconsistent results, especially when handling complex resume layouts.  
- I experimented with libraries like **html2pdf** and similar packages, but none of them were reliable enough for production use.  
- After researching how real-world products handle PDF generation, I discovered that it’s generally done on the **backend**, as it’s more stable and predictable.  
- This led me to adopt **Puppeteer**, a Node.js backend library for headless browser automation, which provided reliable and responsive resume-to-PDF conversion.

Other significant challenges I faced:  
- Ensuring the **resume remained responsive** and visually consistent across PDF exports.  
- Handling **Docker deployment** with Puppeteer (since Puppeteer requires additional dependencies inside Docker to run Chromium properly).  
- Configuring and troubleshooting **MongoDB Atlas connectivity**, which involved dealing with whitelisting issues, IP restrictions, and even Mongoose version mismatches during deployment.

Overcoming these hurdles gave me a deeper understanding of production-grade challenges and how to approach them systematically.


---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)
