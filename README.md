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
[![Screenshot-2025-08-17-163104.png](https://i.postimg.cc/50j2mfKw/Screenshot-2025-08-17-163104.png)](https://postimg.cc/zbZNzYrB)

### Resume Editor
[![Screenshot-2025-08-26-225232.png](https://i.postimg.cc/R0JSYvz9/Screenshot-2025-08-26-225232.png)](https://postimg.cc/mcRWzfD6)
### PDF Preview
[![Screenshot-2025-08-26-225306.png](https://i.postimg.cc/y8b6nktv/Screenshot-2025-08-26-225306.png)](https://postimg.cc/xXLS1T0z)
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

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)
