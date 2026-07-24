# 🌍 RuralVerse AI

### An Intelligent Multilingual AI and Extended Reality (XR) Platform for Personalized and Inclusive Rural Education

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Three.js](https://img.shields.io/badge/Three.js-3D-000000?logo=threedotjs&logoColor=white)](https://threejs.org)
[![Recharts](https://img.shields.io/badge/Recharts-Analytics-22B5BF)](https://recharts.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

<div align="center">

**RuralVerse AI** bridges the educational gap between urban and rural communities by combining **Artificial Intelligence**, **Augmented Reality**, **Virtual Reality**, and **Voice AI** into a single, accessible platform — empowering every student to learn in their native language, explore virtual science labs, and receive personalized tutoring regardless of geographical location.

[Features](#-key-features) · [Modules](#-project-modules) · [Tech Stack](#-technology-stack) · [Getting Started](#-getting-started) · [SDG Alignment](#-sdg-alignment) · [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Abstract](#-abstract)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [Project Modules](#-project-modules)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [AI Models Used](#-ai-models-used)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [SDG Alignment](#-sdg-alignment)
- [Requirements](#-requirements)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Abstract

Education remains one of the greatest challenges in rural communities due to the shortage of qualified teachers, inadequate laboratory facilities, language barriers, and poor internet connectivity. **RuralVerse AI** is an intelligent educational platform that combines:

- 🤖 **Artificial Intelligence** & **Generative AI**
- 🗣️ **Natural Language Processing** & **Voice AI**
- 🔬 **Augmented Reality (AR)**
- 🏫 **Virtual Reality (VR)**
- 📴 **Offline Learning Technologies**

The platform enables students to interact with an AI tutor in their native language, perform virtual science experiments using AR, experience immersive classrooms using VR, receive AI-generated quizzes, and continue learning even without internet access.

---

## ❗ Problem Statement

Students in rural areas face multiple educational challenges:

| Challenge | Impact |
|---|---|
| 🧑‍🏫 Shortage of qualified teachers | Limited subject expertise and guidance |
| 🔬 Absence of science laboratories | No hands-on experimental learning |
| 🌐 Language barriers | Difficulty understanding lessons in non-native languages |
| 📱 Lack of personalized learning | One-size-fits-all approach fails diverse learners |
| 📶 Limited internet connectivity | Inability to access modern e-learning platforms |
| 💻 Poor digital infrastructure | Restricted access to educational technologies |

These factors contribute to lower learning outcomes and widen the educational gap between rural and urban communities.

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🤖 AI-Powered Multilingual Tutoring
Intelligent chatbot that explains concepts, answers doubts, and summarizes lessons in **12 Indian languages** including Hindi, Tamil, Telugu, Bengali, and more.

### 🎙️ Voice-Based Interactive Learning
Speak to learn! Integrated **Speech-to-Text** and **Text-to-Speech** using Web Speech API for hands-free, accessible education.

### 🔬 AR Science Laboratory
Interactive **3D molecular models**, physics simulations (pendulum, solar system), and biology visualizations (cell structure) — all rendered in-browser with Three.js.

### 🏫 VR Smart Classroom
Immersive **3D classroom environment** with virtual desks, interactive whiteboard, bookshelf, and multiple learning environments to choose from.

</td>
<td width="50%">

### 🧠 AI Quiz Generator
Automatically generates quizzes by subject and topic with **timed questions**, instant scoring, detailed explanations, and performance analytics.

### 📊 Learning Analytics
Comprehensive dashboards with **interactive charts** — performance by subject, weekly activity, quiz distributions, and AI-generated study insights.

### 📴 Offline Learning Support
Download lessons for offline access. **Automatic sync** when connectivity is restored, with local storage management.

### 👨‍🏫 Multi-Role Dashboards
Dedicated dashboards for **Students**, **Teachers**, **Parents**, and **Admins** — each with role-specific insights, management tools, and monitoring capabilities.

</td>
</tr>
</table>

---

## 📦 Project Modules

### Module 1 — User Authentication
> Registration, Login, Role-based access (Student/Teacher/Parent/Admin), Student profiles

### Module 2 — AI Multilingual Tutor
> AI chatbot with native language conversations, lesson explanation, doubt clarification, concept summarization across Mathematics, Science, English, History, Geography, and Computer Science

### Module 3 — Voice Learning System
> Speech-to-Text recognition, Text-to-Speech synthesis, voice waveform visualizer, audio lesson library with playback controls

### Module 4 — Personalized Learning Engine
> Adaptive skill tree visualization, course progress tracking, difficulty adjustment, AI-powered smart recommendations

### Module 5 — AR Science Laboratory
> 3D molecular models (H₂O, CH₄, CO₂), pendulum physics simulation, solar system orbits, plant cell anatomy — all interactive with rotate/zoom controls

### Module 6 — VR Smart Classroom
> Full 3D classroom with desks, whiteboard, bookshelf, windows. Multiple virtual environments: Science Lab, Math Room, History Museum, Space Station, Nature Reserve, Library Hall

### Module 7 — AI Quiz Generator
> Subject/topic selection, difficulty levels (Easy/Medium/Hard), countdown timer, instant scoring with explanations, performance review

### Module 8 — Offline Learning
> Lesson download manager with progress tracking, online/offline status detection, storage usage monitoring, automatic synchronization

### Module 9 — Analytics Dashboard
> Performance bar charts, weekly activity area charts, quiz score distribution pie charts, monthly progress line charts, AI-generated study insights

### Module 10 — Teacher & Parent Dashboard
> Class performance trends, assignment tracking, student overview cards, child progress monitoring, teacher-parent messaging

### Module 11 — Content Management System
> Drag-and-drop upload, content library with filters, video lectures, notes, curriculum tree view, content approval workflow

### Module 12 — Admin Dashboard
> System-wide analytics, user management table, content approval queue, system health indicators, feedback management

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Student / User                     │
└──────────────┬───────────────────────┬───────────────┘
               │                       │
    ┌──────────▼──────────┐ ┌─────────▼──────────┐
    │   Authentication    │ │   Role Selection    │
    │  (Student/Teacher/  │ │  (Multi-role Auth)  │
    │   Parent/Admin)     │ │                     │
    └──────────┬──────────┘ └─────────┬──────────┘
               │                       │
    ┌──────────▼───────────────────────▼──────────┐
    │              Main Dashboard                  │
    │         (Role-based Interface)               │
    └──┬────┬────┬────┬────┬────┬────┬────┬───────┘
       │    │    │    │    │    │    │    │
   ┌───▼┐┌─▼──┐┌▼───┐┌▼──┐┌▼──┐┌▼──┐┌▼──┐┌▼────┐
   │ AI ││Voic││Lear││ AR ││ VR ││Qui││Off││Anal │
   │Tuto││e   ││ning││Lab ││Cla ││z  ││lin││ytic │
   │r   ││Lear││Path││    ││ss  ││Gen││e  ││s    │
   └────┘└────┘└────┘└────┘└────┘└───┘└───┘└─────┘
       │         │        │         │        │
   ┌───▼─────────▼────────▼─────────▼────────▼────┐
   │          AI / ML Engine Layer                 │
   │  (NLP · LLM · Speech · Recommendation · CV)  │
   └──────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI component framework |
| **Vite 8** | Build tool and dev server |
| **React Router v6** | Client-side routing (16 routes) |
| **Three.js** | 3D graphics engine |
| **@react-three/fiber** | React renderer for Three.js |
| **@react-three/drei** | Three.js utilities and helpers |
| **Recharts** | Data visualization and charts |
| **Lucide React** | Modern icon library |
| **Vanilla CSS** | Custom design system (39KB) |
| **Google Fonts** | Inter (body) + Outfit (headings) |
| **Web Speech API** | Browser-native STT/TTS |

### Design System
| Feature | Implementation |
|---|---|
| **Dark Theme** | Deep backgrounds (`#0a0a1a` → `#141432`) |
| **Glassmorphism** | `backdrop-filter: blur(20px)` + translucent borders |
| **Accent Colors** | Electric Blue, Neon Purple, Emerald, Coral, Amber, Cyan |
| **Animations** | CSS keyframes + Three.js `useFrame` animations |
| **Responsive** | Mobile-first with breakpoints at 768px, 1200px |

### Backend (Production Roadmap)
| Technology | Purpose |
|---|---|
| FastAPI / Node.js | REST API server |
| Firebase Firestore | Cloud database |
| MongoDB | Document storage |
| SQLite | Offline local database |
| Google Gemini / OpenAI API | LLM for AI tutoring |
| Whisper | Speech recognition |
| Firebase Hosting / Vercel | Deployment |

---

## 🧠 AI Models Used

| Model Category | Purpose | Examples |
|---|---|---|
| **Large Language Model (LLM)** | AI tutoring, question answering, quiz generation | Google Gemini, OpenAI GPT, Llama |
| **Natural Language Processing** | Language understanding, translation, summarization | Transformer models, BERT |
| **Speech Recognition** | Convert speech to text | Whisper, Google Speech API |
| **Text-to-Speech** | Voice-based learning | Coqui TTS, Google TTS |
| **Recommendation Engine** | Personalized learning paths | Collaborative Filtering, Content-Based |
| **Machine Learning** | Performance prediction, dropout detection | Random Forest, XGBoost, Decision Tree |
| **Computer Vision** | AR object recognition | YOLO, MobileNet, CNN |

> **Note:** The current prototype uses simulated AI responses. Integration with real AI APIs (Gemini, OpenAI) is planned for production.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- Modern browser (Chrome, Edge, Firefox)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sweetyvincent/RuralVerse_AI.git

# 2. Navigate to the project directory
cd RuralVerse_AI

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The application will be available at **http://localhost:5173/**

### Build for Production

```bash
npm run build
```

Output will be generated in the `dist/` directory.

### Quick Start Guide

1. Open **http://localhost:5173/** in your browser
2. Explore the **3D landing page** with the floating globe
3. Click **"Get Started"** to navigate to login
4. Enter any email/password and select a role (Student, Teacher, Parent, or Admin)
5. Explore all 12 modules from the sidebar navigation

---

## 📁 Project Structure

```
ruralverse-ai/
│
├── index.html                              # Entry HTML with SEO meta tags
├── package.json                            # Dependencies and scripts
├── vite.config.js                          # Vite configuration
│
├── public/                                 # Static assets
│   └── icons.svg                           # App icons
│
└── src/
    ├── main.jsx                            # React entry point
    ├── App.jsx                             # Router, Auth, Layout definitions
    ├── index.css                           # Complete design system (39KB)
    │
    ├── contexts/
    │   └── AuthContext.jsx                 # Authentication state management
    │
    ├── data/
    │   ├── courses.js                      # Courses, experiments, VR environments
    │   ├── students.js                     # Student profiles, teacher/parent data
    │   ├── quizzes.js                      # Question bank (4 subjects, 12+ topics)
    │   └── languages.js                    # 12 Indian languages with greetings
    │
    ├── services/
    │   └── aiService.js                    # AI response engine with subject matching
    │
    ├── components/
    │   ├── 3d/
    │   │   └── HeroScene.jsx              # Three.js hero (globe, particles, orbits)
    │   └── layout/
    │       └── Sidebar.jsx                # Navigation sidebar with role-based links
    │
    └── pages/
        ├── Landing.jsx                     # 3D landing page with feature cards
        ├── Login.jsx                       # Role-based authentication
        ├── Register.jsx                    # Multi-field registration
        ├── Dashboard.jsx                   # Student home dashboard
        ├── AITutor.jsx                     # Multilingual AI chat interface
        ├── VoiceLearning.jsx               # Speech-to-Text / Text-to-Speech
        ├── LearningPath.jsx                # Skill tree and course progress
        ├── ARLab.jsx                       # 3D science laboratory
        ├── VRClassroom.jsx                 # Immersive 3D classroom
        ├── QuizGenerator.jsx               # Timed quiz with scoring
        ├── OfflineLearning.jsx             # Download manager and sync
        ├── Analytics.jsx                   # Charts and AI insights
        ├── TeacherDashboard.jsx            # Class management
        ├── ParentDashboard.jsx             # Child monitoring
        ├── ContentManagement.jsx           # Content library and uploads
        └── AdminDashboard.jsx              # System administration
```

**Total: 40 files · 9,400+ lines of code**

---

## 🌱 SDG Alignment

RuralVerse AI directly supports the **United Nations Sustainable Development Goals**:

| SDG | Goal | How RuralVerse AI Contributes |
|---|---|---|
| 🎓 **SDG 4** | Quality Education | AI tutoring, AR/VR labs, personalized learning for all |
| ♀️ **SDG 5** | Gender Equality | Equal access to technology-enhanced education |
| 💼 **SDG 8** | Decent Work & Economic Growth | Digital literacy and skill development |
| 🏭 **SDG 9** | Industry, Innovation & Infrastructure | AI + XR educational technology innovation |
| ⚖️ **SDG 10** | Reduced Inequalities | Bridging the urban-rural education gap |
| 🏘️ **SDG 11** | Sustainable Communities | Empowering rural communities through education |

---

## 💻 Requirements

### Software Requirements
| Software | Version |
|---|---|
| Node.js | 18+ |
| npm | 9+ |
| Git | 2.0+ |
| Modern Browser | Chrome 90+, Edge 90+, Firefox 90+ |
| VS Code (recommended) | Latest |

### Hardware Requirements

| Component | Minimum | Recommended |
|---|---|---|
| Processor | Intel Core i5 | Intel Core i7 |
| RAM | 8 GB | 16 GB |
| GPU | Integrated | NVIDIA dedicated |
| Storage | 500 MB free | 2 GB free |
| Display | 1366×768 | 1920×1080 |
| Device | Desktop / Android smartphone | + Meta Quest VR headset |

---

## 🔮 Future Enhancements

- [ ] 🎯 Real AI API integration (Google Gemini / OpenAI GPT)
- [ ] 🔥 Firebase backend with real-time database
- [ ] 🧠 AI-powered career guidance
- [ ] 😊 Emotion detection during learning sessions
- [ ] 🤝 Gesture recognition for hands-free interaction
- [ ] 🏠 IoT-enabled smart classrooms
- [ ] 🔗 Blockchain-based certificates
- [ ] 📝 AI-generated lesson plans
- [ ] 🌐 Multi-user collaborative VR classrooms
- [ ] 📱 Flutter mobile app (Android/iOS)
- [ ] 🎮 Gamification with rewards and leaderboards
- [ ] 👤 Digital twin classrooms

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Areas for Contribution
- 🌍 Adding more language translations
- 🧪 New AR experiment models
- 🎨 UI/UX improvements
- 📝 Documentation improvements
- 🧪 Unit tests and integration tests
- ♿ Accessibility improvements

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev) — UI Framework
- [Three.js](https://threejs.org) — 3D Graphics Engine
- [Vite](https://vite.dev) — Build Tool
- [Recharts](https://recharts.org) — Chart Library
- [Lucide](https://lucide.dev) — Icon Library
- [Google Fonts](https://fonts.google.com) — Typography

---

## 📬 Contact

**Project Link:** [https://github.com/sweetyvincent/RuralVerse_AI](https://github.com/sweetyvincent/RuralVerse_AI)

---

<div align="center">

**Built with ❤️ for Rural Education**

*Empowering every village with world-class AI-powered education*

⭐ **Star this repo if you find it helpful!** ⭐

</div>
